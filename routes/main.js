const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'home.html'));
});

module.exports = router;