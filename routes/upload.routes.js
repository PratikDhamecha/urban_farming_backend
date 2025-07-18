const express = require('express');
const upload = require('../Config/multer');
const { getGFS } = require('../Config/gridfs');
const router = express.Router();

// Upload image
router.post('/image', upload.single('image'), (req, res) => {
  res.json({
    fileId: req.file.id,
    url: `/api/images/${req.file.filename}`
  });
});

// Serve image
router.get('/images/:filename', (req, res) => {
  const gfs = getGFS();
  if (!gfs) return res.status(500).json({ message: 'GFS not initialized' });

  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ message: 'No file exists' });
    }
    if (file.contentType && file.contentType.startsWith('image/')) {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({ message: 'Not an image' });
    }
  });
});

module.exports = router; 