const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile, upload } = require("../controllers/userController");

// Get profile
router.get("/profile", getUserProfile);

// Update profile with image upload
router.put("/profile", upload.single("profileImage"), updateUserProfile);

module.exports = router;
