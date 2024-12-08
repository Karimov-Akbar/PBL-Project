const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const newsDb = require('../db/news');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  const query = `SELECT id, title, image, content, date FROM news ORDER BY date DESC`;
  newsDb.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error fetching news' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/:id', (req, res) => {
  const query = `SELECT id, title, image, content, date FROM news WHERE id = ?`;
  newsDb.get(query, [req.params.id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error fetching news item' });
    } else if (!row) {
      res.status(404).json({ error: 'News item not found' });
    } else {
      res.json(row);
    }
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const { title, content } = req.body;
  const image = req.file.filename;
  const date = new Date().toISOString();

  const query = `INSERT INTO news (title, image, content, date) VALUES (?, ?, ?, ?)`;
  newsDb.run(query, [title, image, content, date], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error creating news item' });
    } else {
      res.json({ id: this.lastID, title, image, content, date });
    }
  });
});

router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const image = req.file ? req.file.filename : req.body.currentImage;
  const query = `UPDATE news SET title = ?, image = ?, content = ? WHERE id = ?`;

  newsDb.run(query, [title, image, content, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error updating news item' });
    } else {
      res.json({ id, title, image, content });
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM news WHERE id = ?`;

  newsDb.run(query, [id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error deleting news item' });
    } else {
      res.json({ message: 'News item deleted successfully' });
    }
  });
});

module.exports = router;