// File: routes/public.js
const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');
const Album = require('../models/Album'); // 🔧 REQUIRED for API route

// Standard pages
router.get('/', publicController.homePage);
router.get('/album/:id', publicController.viewAlbum);
router.post('/albums/:id/like', publicController.likeAlbum);
router.post('/albums/:id/play', publicController.playAlbum);

// API for fetching albums
router.get('/api/albums', async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch albums' });
  }
});

module.exports = router;
