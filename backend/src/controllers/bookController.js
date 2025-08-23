const Book = require('../models/bookModel');

exports.createBook = async (req, res) => {
  console.log('Incoming request body:', req.body);
  try {
    const { title, author, year, quantity, status } = req.body;

    if (!title || !author || !year || !quantity || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await Book.addBook({ title, author, year, quantity, status });
    res.status(201).json({ message: 'Book added successfully' });

  } catch (error) {
    console.error('Error in createBook:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error('Error in getAllBooks:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await Book.deleteBook(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error in deleteBook:', error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, year, quantity, status } = req.body;

  try {
    await Book.updateBook(id, { title, author, year, quantity, status });
    res.status(200).json({ message: 'Book updated successfully' });
  } catch (error) {
    console.error('Error in updateBook:', error);
    res.status(500).json({ message: error.message });
  }
};
