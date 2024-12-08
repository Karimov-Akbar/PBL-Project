const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/users');

router.get('/', (req, res) => {
  const query = `SELECT id, username, email FROM users`;
  db.all(query, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching users.');
    } else {
      res.json(rows);
    }
  });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  let query;
  let params;

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    query = `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`;
    params = [username, email, hashedPassword, id];
  } else {
    query = `UPDATE users SET username = ?, email = ? WHERE id = ?`;
    params = [username, email, id];
  }

  db.run(query, params, function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error updating user.');
    } else {
      res.send('User updated successfully.');
    }
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM users WHERE id = ?`;
  
  db.run(query, [id], function(err) {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error deleting user.');
    } else {
      res.send('User deleted successfully.');
    }
  });
});

module.exports = router;