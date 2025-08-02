// -----------------------------
// File: server.js
// -----------------------------
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const { contentSecurityPolicy } = require('helmet');
const nodemailer = require('nodemailer'); // <-- ADDED: Import nodemailer

const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');
const authRoutes = require('./routes/auth');

const app = express();

// DB connect
mongoose.connect(process.env.MONGO_URI, {
  dbname: "MusicPortfolio",
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Custom CSP to allow Tailwind CDN, Cloudinary, ui-avatars
app.use(helmet());
app.use(contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com"],
      scriptSrcAttr: ["'unsafe-inline'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'",
        "https://cdn.tailwindcss.com",
        "https://fonts.googleapis.com",
        "https://cdnjs.cloudflare.com",          // ✅ for Font Awesome CSS
        "https://use.fontawesome.com"            // ✅ sometimes used
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com",
        "https://cdnjs.cloudflare.com",          // ✅ for Font Awesome fonts
        "https://use.fontawesome.com"            // ✅ fallback
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://ui-avatars.com",
        "https://res.cloudinary.com",
        "https://placehold.co"
      ],
      mediaSrc: ["'self'", "https://res.cloudinary.com"],
      connectSrc: ["'self'", "https://res.cloudinary.com"],
      frameSrc: ["'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      formAction: ["'self'"]
    }
  }));
  

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// <-- ADDED: Nodemailer setup and contact form API endpoint -->

// Configure the Nodemailer transporter. Replace with your email service details.
// Note: It's highly recommended to use environment variables for security.
// For Gmail, you will need to generate an 'App password' for your account.
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services like 'Outlook', 'SendGrid', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API endpoint to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate incoming data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email address
    to: process.env.RECIPIENT_EMAIL, // Recipient's email address
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h2>Contact Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send message.' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

// Routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
