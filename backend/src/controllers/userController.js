const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userController = require("./userController");
const User = require("../models/userModel");
require("dotenv").config();

// ✅ Register user
exports.register = async (req, res) => {
  try {
    const { userId, name, email, phone,  role, password } = req.body;
    const photo = req.file ? req.file.filename : null; // multer uploads file

    // Validation
    if (!userId || !name || !email ||!phone || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const result = await User.create({
      userId,
      name,
      phone,
      email,
      role,
      password: hashedPassword,
      photo
    });

    // Create token
    const token = jwt.sign(
      { userId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || "1h" }
    );

    res.json({ success: true, message: "✅ User registered successfully", token });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "An error occurred. Try again later." });
  }
};

// ✅ Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    // Validate password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // Create token
    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "✅ Login successful",
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        photo: user.photo
      }
    });
  } catch (err) {
    console.error("Login error:", err);
   res.status(500).json({ success: false, message: err.message });

  }
};
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT middleware
    const user = await User.findByUserId(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId; // from JWT
    const { phone, email, password } = req.body;
    const photo = req.file ? req.file.filename : null;

    let updateFields = {};
    if (phone) updateFields.phone = phone;
    if (email) updateFields.email = email;
    if (photo) updateFields.photo = photo;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.password = hashedPassword;
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ success: false, message: "No data to update" });
    }

    await User.update(updateFields, userId); // adapt to your model

    res.json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
