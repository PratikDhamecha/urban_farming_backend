const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
require('dotenv').config();

const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // Ensure this is set in your .env
  file: (req, file) => ({
    filename: `${Date.now()}-${file.originalname}`,
    bucketName: 'uploads'
  })
});

const upload = multer({ storage });
module.exports = upload; 