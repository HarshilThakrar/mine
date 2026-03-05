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

// Root HTML routes
const rootPages = ['contact', 'services', 'trust', 'career', 'blog', 'blog-detail'];
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

rootPages.forEach(page => {
  app.get(`/${page}`, (req, res) => res.sendFile(path.join(__dirname, `${page}.html`)));
  app.get(`/${page}.html`, (req, res) => res.sendFile(path.join(__dirname, `${page}.html`)));
});

// Services subdirectory routes
app.get('/services/:page', (req, res) => {
  let page = req.params.page;
  if (!page.endsWith('.html')) page += '.html';
  res.sendFile(path.join(__dirname, 'services', page));
});

// --- DATABASE CONNECTION ---
let poolOptions;

if (process.env.DATABASE_URL) {
  try {
    const dbUri = process.env.DATABASE_URL.trim();
    // parse manually to ensure no string misinterpretation
    const DB_URL = new URL(dbUri);
    poolOptions = {
      host: DB_URL.hostname,
      port: DB_URL.port || 3306,
      user: decodeURIComponent(DB_URL.username),
      password: decodeURIComponent(DB_URL.password),
      database: DB_URL.pathname.substring(1).split('?')[0],
      ssl: { rejectUnauthorized: false }, // Required for TiDB/Aiven
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };
    console.log(`[DB] Configured via DATABASE_URL. Host: ${poolOptions.host}:${poolOptions.port}`);
  } catch (err) {
    console.error('[DB] DATABASE_URL Error:', err.message);
  }
}

if (!poolOptions) {
  poolOptions = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'minehr',
    port: parseInt(process.env.DB_PORT || '3306'),
    ssl: process.env.DB_SSL === 'false' ? null : { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };
  console.log(`[DB] Configured via individual Env Vars. Host: ${poolOptions.host}:${poolOptions.port}`);
}

const db = mysql.createPool(poolOptions);

// Test Pool Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('[DB] Pool Connection Error:', err.message);
    if (err.code === 'ENOTFOUND') {
      console.error('[DB] DNS Error: Make sure your DATABASE_URL or DB_HOST is correct.');
    }
  } else {
    console.log('[DB] Pool connected successfully.');
    connection.release();
  }
});

// --- API ROUTES ---

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
        console.error('[API/Apply] DB Error:', err.message);
        return res.status(500).json({ error: 'Database error: ' + err.message });
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

  db.query(
    'INSERT INTO contacts (name, email, contact_number, company, message, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
    [name, email, contact_number, company, message],
    async (err, result) => {
      if (err) {
        console.error('[API/Contact] DB Error:', err.message);
        return res.status(500).json({ error: 'Database error: ' + err.message });
      }

      // Success Response (Background Email)
      res.json({ success: true });

      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.hostinger.com',
          port: process.env.SMTP_PORT || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER || 'hr@minehrsolutions.com',
            pass: process.env.SMTP_PASS || "Minehrsolutions@1#"
          },
          connectionTimeout: 5000
        });

        const mailOptions = {
          from: 'hr@minehrsolutions.com',
          to: 'hr@minehrsolutions.com',
          subject: 'New Contact Us Submission',
          text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contact_number}\nCompany: ${company}\nMessage: ${message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) console.error('[API/Contact] Background Email Error:', error.message);
          else console.log('[API/Contact] Email sent successfully');
        });
      } catch (mailErr) {
        console.error('[API/Contact] Mail Config Error:', mailErr.message);
      }
    }
  );
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
  });
}

module.exports = app;
