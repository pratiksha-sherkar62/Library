
// bookRoute : 
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { addBook } = require("../controllers/bookController");
const { getDB } = require("../config/db");

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

// POST /api/books/add
router.post("/add", upload.single("image"), addBook);

router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const [rows] = await db.execute("SELECT * FROM books");
    res.json({ books: rows });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;