const { getDB } = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs = require("fs");
const path = require("path");

// Fetch current user profile
exports.getProfile = async (req, res) => {
  try {
    const db = getDB();
    const [rows] = await db.query("SELECT * FROM profiles WHERE user_id = ?", [req.user.id]);
    if (rows.length === 0) {
      return res.json({ success: true, profile: {} }); // no profile yet
    }
    // attach full URL to profile_pic
    const profile = rows[0];
    if (profile.profile_pic) {
      profile.profile_pic = `http://localhost:5000/uploads/${profile.profile_pic}`;
    }
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create or update profile
exports.updateProfile = async (req, res) => {
  try {
    const db = getDB();
    const { name, phone, role, class_number, prn_number } = req.body;
    let profile_pic = req.file ? req.file.filename : null;

    // Check if profile exists
    const [existing] = await db.query("SELECT * FROM profiles WHERE user_id = ?", [req.user.id]);

    if (existing.length === 0) {
      // Insert new profile
      const [result] = await db.query(
        "INSERT INTO profiles (user_id, name, phone, profile_pic, role, class_number, prn_number) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [req.user.id, name, phone, profile_pic, role, class_number, prn_number]
      );
      return res.json({ success: true, message: "Profile created successfully" });
    } else {
      // Delete old profile_pic if new one uploaded
      if (profile_pic && existing[0].profile_pic) {
        const oldPicPath = path.join(__dirname, "..", "uploads", existing[0].profile_pic);
        if (fs.existsSync(oldPicPath)) fs.unlinkSync(oldPicPath);
      }
      // Update existing profile
      await db.query(
        "UPDATE profiles SET name=?, phone=?, profile_pic=COALESCE(?, profile_pic), role=?, class_number=?, prn_number=? WHERE user_id=?",
        [name, phone, profile_pic, role, class_number, prn_number, req.user.id]
      );
      return res.json({ success: true, message: "Profile updated successfully" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update profile" });
  }
};
