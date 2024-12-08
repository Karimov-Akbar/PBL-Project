const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const galleryDb = require('../db/gallery');

const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  galleryDb.all('SELECT * FROM images', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const { filename } = req.file;
  const url = `/uploads/${filename}`;

  galleryDb.run('INSERT INTO images (filename, url) VALUES (?, ?)', [filename, url], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, filename, url });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  galleryDb.get('SELECT filename FROM images WHERE id = ?', [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (!row) {
      res.status(404).send('Image not found');
      return;
    }
    const filePath = path.join(uploadsDir, row.filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
      }
      galleryDb.run('DELETE FROM images WHERE id = ?', [id], function(err) {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({ message: 'Image deleted successfully' });
      });
    });
  });
});

module.exports = router;