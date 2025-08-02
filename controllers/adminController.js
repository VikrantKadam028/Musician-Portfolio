// File: controllers/adminController.js
const Album = require('../models/Album');
const generateThumbnail = require('../utils/generateThumbnail');

exports.getDashboard = async (req, res) => {
  const albums = await Album.find().sort({ createdAt: -1 });
  res.render('dashboard', { albums });
};

exports.uploadAlbum = async (req, res) => {
  const { title, genre, artist, description } = req.body;
  const audioFiles = req.files.map(file => file.path);
  const coverImage = generateThumbnail(title);

  const album = new Album({ title, genre, artist, description, audioFiles, coverImage });
  await album.save();

  res.redirect('/admin/dashboard');
};

exports.deleteAlbum = async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  res.redirect('/admin/dashboard');
};

exports.editAlbum = async (req, res) => {
  const { title, genre, artist, description } = req.body;
  await Album.findByIdAndUpdate(req.params.id, { title, genre, artist, description });
  res.redirect('/admin/dashboard');
};
