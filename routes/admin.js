// File: routes/admin.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const multer = require('../middlewares/multer');
const { isLoggedIn } = require('../middlewares/authMiddleware');

router.get('/dashboard', isLoggedIn, adminController.getDashboard);
router.post('/upload', isLoggedIn, multer.array('audioFiles', 3), adminController.uploadAlbum);
router.post('/delete/:id', isLoggedIn, adminController.deleteAlbum);
router.post('/edit/:id', isLoggedIn, adminController.editAlbum);

module.exports = router;
