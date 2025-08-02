// File: routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/admin-harsh-login', authController.getLogin);
router.post('/admin-harsh-login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;
