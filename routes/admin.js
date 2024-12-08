const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('../db/users');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM admins WHERE username = ?`;
  db.get(query, [username], async (err, row) => {
    if (err) {
      console.error(err.message);
      return res.json({ success: false, message: 'Error occurred during login.' });
    }

    if (row) {
      const match = await bcrypt.compare(password, row.password);
      if (match) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: 'Invalid username or password.' });
      }
    } else {
      res.json({ success: false, message: 'Invalid username or password.' });
    }
  });
});

router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'admin.html'));
});

module.exports = router;

