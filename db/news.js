const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'news_database.db'), (err) => {
  if (err) {
    console.error('Error connecting to news database:', err.message);
  } else {
    console.log('Connected to the news database.');
  }
});

module.exports = db;