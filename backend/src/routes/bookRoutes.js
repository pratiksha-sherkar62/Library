/* const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.post('/', bookController.createBook);
router.delete('/:id', bookController.deleteBook);
router.put('/:id', bookController.updateBook);

module.exports = router;
 */
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

router.get("/all-books", verifyToken, (req, res) => {
  // Now you can use req.user
  res.json({ message: `Welcome ${req.user.role}, here are the books.` });
});

// Example: only admin can add books
router.post("/add-book", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  res.json({ message: "Book added successfully!" });
});

module.exports = router;
