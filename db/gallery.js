const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'gallery.db'), (err) => {
  if (err) {
    console.error('Error connecting to gallery database:', err.message);
  } else {
    console.log('Connected to the gallery database.');
  }
});

module.exports = db;