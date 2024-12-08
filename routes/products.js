const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const productsDb = require('../db/products');

const productsImagesDir = path.join(__dirname, '..', 'public', 'images', 'products');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productsImagesDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  const query = `SELECT * FROM products ORDER BY id DESC`;
  productsDb.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error fetching products' });
    } else {
      res.json(rows);
    }
  });
});

router.get('/:id', (req, res) => {
  const query = `SELECT * FROM products WHERE id = ?`;
  productsDb.get(query, [req.params.id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error fetching product' });
    } else if (!row) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.json(row);
    }
  });
});

router.post('/', upload.single('image'), (req, res) => {
  const { name, description, price, category_id } = req.body;
  const image_url = req.file ? `/images/products/${req.file.filename}` : null;

  const query = `INSERT INTO products (name, description, price, category_id, image_url) VALUES (?, ?, ?, ?, ?)`;
  productsDb.run(query, [name, description, price, category_id, image_url], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error creating product' });
    } else {
      res.json({ 
        id: this.lastID,
        name,
        description,
        price,
        category_id,
        image_url
      });
    }
  });
});

router.put('/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, price, category_id } = req.body;
  const image_url = req.file ? `/images/products/${req.file.filename}` : req.body.current_image;

  const query = `UPDATE products SET name = ?, description = ?, price = ?, category_id = ?, image_url = ? WHERE id = ?`;
  productsDb.run(query, [name, description, price, category_id, image_url, id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error updating product' });
    } else {
      res.json({
        id,
        name,
        description,
        price,
        category_id,
        image_url
      });
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  productsDb.get('SELECT image_url FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Error finding product' });
    }
    
    productsDb.run('DELETE FROM products WHERE id = ?', [id], function(err) {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Error deleting product' });
      }
      
      if (row && row.image_url) {
        const imagePath = path.join(__dirname, '..', 'public', row.image_url);
        fs.unlink(imagePath, (err) => {
          if (err) {
            console.error('Error deleting product image:', err);
          }
        });
      }
      
      res.json({ message: 'Product deleted successfully' });
    });
  });
});

module.exports = router;