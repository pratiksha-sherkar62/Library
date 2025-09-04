const express = require("express");
const multer = require("multer");
const fs = require("fs");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ========== ROUTES ==========

// Add new book
router.post("/add", upload.single("image"), addBook);

// Get all books
router.get("/", getBooks);

// Update book (with optional new image)
router.put("/:id", upload.single("image"), updateBook);

// Delete book
router.delete("/:id", deleteBook);

module.exports = router;
