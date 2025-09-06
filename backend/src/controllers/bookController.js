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
      bookId: result.insertId,
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
    const { bookId } = req.params;
    const { title, author, isbn, copies_total, copies_available } = req.body;

    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }

    const db = getDB();
    const query = `
      UPDATE books 
      SET title = ?, author = ?, isbn = ?, copies_total = ?, copies_available = ?
      WHERE bookId = ?
    `;
    const [result] = await db.execute(query, [
        bookId,
        title,
      author,
      isbn,
      copies_total,
      copies_available
    
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
    const { id } = req.params; // <-- must come from URL /:id
    if (!id) {
      return res.status(400).json({ message: "Book ID is required" });
    }

    const db = getDB();
    const [result] = await db.execute("DELETE FROM books WHERE bookId = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting book:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ================= REQUEST BOOK =================
exports.requestBook = (req, res) => {
  const { bookId, userId } = req.body;

  // Check availability first
  const checkQuery = "SELECT copies_available FROM books WHERE id=?";
  db.query(checkQuery, [bookId], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result[0].copies_available > 0) {
      // Reduce available copies
      const updateQuery = "UPDATE books SET copies_available = copies_available - 1 WHERE id=?";
      db.query(updateQuery, [bookId], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });

        // You can also insert into a "book_requests" table
        res.json({ message: "Book requested successfully!" });
      });
    } else {
      res.status(400).json({ message: "No copies available" });
    }
  });
};

