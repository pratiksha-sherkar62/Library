const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const verifyToken = require('../middlewares/authMiddleware');
const bookController = require('../controllers/bookController');

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Admin-only add book
router.post('/add-book', verifyToken, upload.single('image'), async (req, res) => {
  try {
    if (req.user.role !== 'admin')
      return res.status(403).json({ message: 'Access denied. Admins only.' });

    await bookController.createBook(req, res);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all books (any logged-in user)
router.get('/all-books', verifyToken, bookController.getAllBooks);

module.exports = router;
// Delete book (admin only)