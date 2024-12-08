const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'products.db'), (err) => {
  if (err) {
    console.error('Error connecting to products database:', err.message);
  } else {
    console.log('Connected to the products database.');
  }
});

module.exports = db;