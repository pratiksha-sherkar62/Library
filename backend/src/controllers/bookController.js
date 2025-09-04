const { getDB } = require("../config/db");

// ================= ADD BOOK =================
exports.addBook = async (req, res) => {
  try {
    const { title, author, isbn, copies_total, copies_available } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author required" });
    }

    const db = getDB();
    const query = `
      INSERT INTO books (title, author, isbn, copies_total, copies_available, image) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(query, [
      title,
      author,
      isbn,
      copies_total,
      copies_available,
      image,
    ]);

    const newBook = {
      id: result.insertId,
      title,
      author,
      isbn,
      copies_total,
      copies_available,
      image,
    };

    if (req.io) req.io.emit("newBook", newBook);

    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (err) {
    console.error("❌ Error adding book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= GET ALL BOOKS =================
exports.getBooks = async (req, res) => {
  try {
    const db = getDB();
    const [books] = await db.execute("SELECT * FROM books");
    res.status(200).json({ books });
  } catch (err) {
    console.error("❌ Error fetching books:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= UPDATE BOOK =================
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, isbn, copies_total, copies_available } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    const db = getDB();
    const query = `
      UPDATE books 
      SET title = ?, author = ?, isbn = ?, copies_total = ?, copies_available = ?
      WHERE id = ?
    `;
    const [result] = await db.execute(query, [
      title,
      author,
      isbn,
      copies_total,
      copies_available,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (err) {
    console.error("❌ Error updating book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= DELETE BOOK =================
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const db = getDB();

    const [result] = await db.execute("DELETE FROM books WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
