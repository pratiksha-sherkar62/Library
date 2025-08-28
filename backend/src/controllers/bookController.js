// const Book = require('../models/bookModel');

const Book = require('../models/bookModel');
const path = require('path');
const fs = require('fs');

// Multer setup (backend server file: routes/bookRoutes.js मध्ये import करावा)
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir); // uploads folder create
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});
const upload = multer({ storage });

exports.createBook = async (req, res) => {
  try {
    const { title, author, year, quantity, status } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !author || !year || !quantity || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await Book.addBook({ title, author, year, quantity, status, image });
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
