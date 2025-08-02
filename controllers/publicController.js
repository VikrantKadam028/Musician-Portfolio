// File: controllers/publicController.js
const Album = require('../models/Album');

exports.homePage = async (req, res) => {
  const albums = await Album.find().sort({ createdAt: -1 });
  res.render('home', { albums });
};

exports.viewAlbum = async (req, res) => {
  const album = await Album.findById(req.params.id);
  if (!album) return res.status(404).send('Album not found');
  res.render('album', { album });
};

exports.likeAlbum = async (req, res) => {
  await Album.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } });
  res.sendStatus(200);
};

exports.playAlbum = async (req, res) => {
  await Album.findByIdAndUpdate(req.params.id, { $inc: { playCount: 1 } });
  res.sendStatus(200);
};
