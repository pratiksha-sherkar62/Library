const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const bookController = require("../controllers/bookController");
const {
  addBook,
  getBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addBook);
router.get("/", getBooks);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);
router.post("/request", bookController.requestBook);

module.exports = router;
