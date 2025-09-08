const express = require("express");
const router = express.Router();
const db = require("../config/db");

// POST request to create a new book request
router.post("/request", async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Check if book exists and has copies available
    const [book] = await db.execute(`SELECT * FROM books WHERE bookId = ?`, [bookId]);
    if (!book.length) return res.status(404).json({ message: "Book not found" });
    if (book[0].copies_available <= 0) return res.status(400).json({ message: "No copies available" });

    // Insert into book_requests table
    await db.execute(
      `INSERT INTO book_requests (bookId, userId) VALUES (?, ?)`,
      [bookId, userId]
    );

    res.json({ message: "Book request sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
