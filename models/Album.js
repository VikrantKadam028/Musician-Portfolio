// File: models/Album.js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: String,
  genre: String,
  artist: String,
  description: String,
  audioFiles: [String],         // Cloudinary URLs
  coverImage: String,           // UI Avatar URL
  likes: { type: Number, default: 0 },
  playCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Album', albumSchema);
