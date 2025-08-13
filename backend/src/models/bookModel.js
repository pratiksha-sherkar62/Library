const { getDB } = require('../config/db');

exports.addBook = async (book) => {
  const db = getDB();
  const { title, author, year, quantity, status } = book;
  const [result] = await db.query(
    'INSERT INTO books (title, author, year, quantity, status) VALUES (?, ?, ?, ?, ?)',
    [title, author, year, quantity, status]
  );
  return result;
};

exports.getAllBooks = async () => {
  const db = getDB();
  console.log("DB object:", db); // 👈 This will tell if DB is connected
  const [rows] = await db.query('SELECT * FROM books ORDER BY id DESC');
  return rows;
};
