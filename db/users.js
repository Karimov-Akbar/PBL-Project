const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'users.db'), (err) => {
  if (err) {
    console.error('Error connecting to users database:', err.message);
  } else {
    console.log('Connected to the users database.');
  }
});

module.exports = db;