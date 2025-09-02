const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { getProfile, updateProfile } = require("../controllers/profileController");
const verifyToken = require("../middlewares/authmiddleware");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes
router.get("/me", verifyToken, getProfile);
router.put("/update", verifyToken, upload.single("profile_pic"), updateProfile);

module.exports = router;
