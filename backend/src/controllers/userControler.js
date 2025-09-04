const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
require("dotenv").config();

const Profile = require("../models/profileModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) 
      return res.status(400).json({ success: false, message: "All fields are required" });

    const existingUsers = await User.findByEmail(email);
    if (existingUsers.length > 0) 
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ name, email, password: hashedPassword });

    // Create default profile
    await Profile.create({
        user_id: result.insertId,
        name: name,
        phone: "",
        profile_pic: "",
        role: "student",
        class_number: "",
        prn_number: ""
    });

    const token = jwt.sign({ id: result.insertId, email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    res.json({ success: true, message: "User registered successfully", token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred. Try again later." });
  }
};


// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const results = await User.findByEmail(email);

    if (results.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
};


