// File: middlewares/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'mee-harshwardhan',
    resource_type: 'video',
    format: async () => 'mp3',
    public_id: (req, file) => file.originalname.split('.')[0]
  }
});

module.exports = multer({ storage });
