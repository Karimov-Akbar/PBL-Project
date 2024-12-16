const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

const db = require('./db/users');
const productsDb = require('./db/products');
const galleryDb = require('./db/gallery');
const newsDb = require('./db/news');

const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const productsImagesDir = path.join(__dirname, 'public', 'images', 'products');
if (!fs.existsSync(productsImagesDir)) {
  fs.mkdirSync(productsImagesDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (req.path.startsWith('/api/products')) {
            cb(null, productsImagesDir);
        } else {
            cb(null, uploadsDir);
        }
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const newsRoutes = require('./routes/news');
const galleryRoutes = require('./routes/gallery');
const productRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');

app.use('/', mainRoutes);
app.use('/', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/products', productRoutes);
app.use('/admin', adminRoutes);

app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filePath = path.join(__dirname, 'public', `${page}.html`);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('404: Page not found');
    }
  });
});

// Start server
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

