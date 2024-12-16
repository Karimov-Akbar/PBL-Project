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
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required.' 
    });
  }

  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ?`;

  db.get(query, [username], async (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ 
        success: false, 
        message: 'Error occurred during login.' 
      });
    }

    if (!row) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid username or password.' 
      });
    }

    try {
      const match = await bcrypt.compare(password, row.password);
      if (match) {
        res.json({ 
          success: true, 
          redirect: row.is_admin ? '/admin/home' : '/home' 
        });
      } else {
        res.status(401).json({ 
          success: false, 
          message: 'Invalid username or password.' 
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        success: false, 
        message: 'Error occurred during login.' 
      });
    }
  });
});

module.exports = router;

