const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/users');

router.post('/register', async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.send('Passwords do not match.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) {
      console.error(err.message);
      res.send('Error occurred during registration.');
    } else {
      res.redirect('/home');
    }
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, row) => {
    if (err) {
      console.error(err.message);
      return res.json({ success: false, message: 'Error occurred during login.' });
    }

    if (row) {
      const match = await bcrypt.compare(password, row.password);
      if (match) {
        if (row.is_admin) {
          res.json({ success: true, redirect: '/admin/home' });
        } else {
          res.json({ success: true, redirect: '/home' });
        }
      } else {
        res.json({ success: false, message: 'Invalid username or password.' });
      }
    } else {
      res.json({ success: false, message: 'Invalid username or password.' });
    }
  });
});

module.exports = router;