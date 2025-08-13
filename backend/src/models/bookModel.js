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
