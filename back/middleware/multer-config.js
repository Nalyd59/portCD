const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.memoryStorage(); // Utilisez la mémoire pour stocker temporairement les fichiers

const fileFilter = (req, file, callback) => {
  if (MIME_TYPES[file.mimetype]) {
    callback(null, true);
  } else {
    callback(new Error('Invalid file type.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single('image');

// Middleware pour télécharger et convertir en WebP
const uploadAndConvertToWebP = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      req.webpData = null; 
      return next();
    }

    // Utilisez Sharp pour transformer l'image en WebP
    sharp(req.file.buffer)
      .webp()
      .toBuffer()
      .then((webpData) => {
        req.webpData = webpData;
        next();
      })
      .catch(next);
  });
};

module.exports = uploadAndConvertToWebP;