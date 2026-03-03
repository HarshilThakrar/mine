const express = require('express');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Serve assets (css, js, images) from public
app.use(express.static(path.join(__dirname, 'public')));

// Dynamic route for services subdirectory
app.get('/services/:page', (req, res) => {
  const page = req.params.page.endsWith('.html') ? req.params.page : req.params.page + '.html';
  res.sendFile(path.join(__dirname, 'services', page));
});

// Dynamic route for root HTML files
app.get('/:page', (req, res) => {
  if (req.params.page.includes('.') && !req.params.page.endsWith('.html')) {
    return res.status(404).end(); // Skip non-html files if they leaked through
  }
  const page = req.params.page.endsWith('.html') ? req.params.page : req.params.page + '.html';
  res.sendFile(path.join(__dirname, page));
});

// Default route
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// MySQL connection - Using environment variables for production
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'minehr',
  port: process.env.DB_PORT || 3306,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : null
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});


// Job application form API
const multer = require('multer');
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  })
});

app.post('/api/apply', upload.single('resume'), (req, res) => {
  const { fullName, email, phone, location } = req.body;
  const resumeFile = req.file ? req.file.filename : null;

  if (!fullName || !email || !phone || !resumeFile) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.query(
    'INSERT INTO career (full_name, email, phone, location, resume, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
    [fullName, email, phone, location, resumeFile],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    }
  );
});
// Contact form API
app.post('/api/contact', async (req, res) => {
  const { name, email, contact_number, company, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert into DB (company is optional, created_at auto handled)
  db.query(
    'INSERT INTO contacts (name, email, contact_number, company, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
    [name, email, contact_number, company, message],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      // Send email
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.hostinger.com',
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER || 'hr@minehrsolutions.com',
          pass: process.env.SMTP_PASS || "Minehrsolutions@1#"
        }
      });
      const mailOptions = {
        from: 'hr@minehrsolutions.com',
        to: 'hr@minehrsolutions.com',
        subject: 'New Contact Us Submission',
        text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contact_number}\nCompany: ${company}\nMessage: ${message}`
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email error details:', error); // Add this line
          return res.status(500).json({ error: 'Email error' });
        }
        res.json({ success: true });
      });
    }
  );
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

module.exports = app;
