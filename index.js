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

// Serve HTML pages from root
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/contact.html', (req, res) => res.sendFile(path.join(__dirname, 'contact.html')));
app.get('/blog.html', (req, res) => res.sendFile(path.join(__dirname, 'blog.html')));
app.get('/career.html', (req, res) => res.sendFile(path.join(__dirname, 'career.html')));
app.get('/services.html', (req, res) => res.sendFile(path.join(__dirname, 'services.html')));
app.get('/trust.html', (req, res) => res.sendFile(path.join(__dirname, 'trust.html')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Change if needed
  password: '', // Change if needed
  database: 'minehr'
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL database minehr');
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
      // Send email to hr@minehrsolutions.com
      const transporter = nodemailer.createTransport({
        host: 'smtp.hostinger.com',
        port: 587,
        secure: true,
        auth: {
          user: 'hr@minehrsolutions.com', // Use your email
          pass: "Minehrsolutions@1#" // Use your email password or app password
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

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
