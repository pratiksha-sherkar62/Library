const { getDB } = require('../config/db');

exports.addBook = async (book) => {
  const db = getDB();
  const { title, author, year, quantity, status, image } = book;
  const [result] = await db.query(
    'INSERT INTO books (title, author, year, quantity, status, image) VALUES (?, ?, ?, ?, ?, ?)',
    [title, author, year, quantity, status, image]
  );
  return result;
};

exports.getAllBooks = async () => {
  const db = getDB();
  console.log("DB object:", db); // 👈 This will tell if DB is connected
  const [rows] = await db.query('SELECT * FROM books ORDER BY id ASC');
  return rows;
};

exports.deleteBook = async (id) => {
  const db = getDB();
  await db.query('DELETE FROM books WHERE id = ?', [id]);
};

exports.updateBook = async (id, book) => {
  const db = getDB();
  const { title, author, year, quantity, status } = book;
  await db.query(
    'UPDATE books SET title = ?, author = ?, year = ?, quantity = ?, status = ? WHERE id = ?',
    [title, author, year, quantity, status, id]
  );
};
