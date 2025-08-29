

// bookController : 
const e = require("express");
const { getDB } = require("../config/db");

exports.addBook = async (req, res) => {
  try {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);

    const { title, author } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author required" });
    }

    const db = getDB();
    const query = "INSERT INTO books (title, author, image) VALUES (?, ?, ?)";
    const [result] = await db.execute(query, [title, author, image]);

    res.status(201).json({ message: "Book added successfully", bookId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const db = getDB();
    const query = "SELECT * FROM books";
    const [books] = await db.execute(query);

    res.status(200).json({ books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
