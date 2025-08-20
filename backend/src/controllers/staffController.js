// src/controllers/staffController.js
const db = require("../config/db");

// Register staff
const registerStaff = (req, res) => {
  const { name, email, phonno, password, position } = req.body;

  if (!name || !email || !phonno || !password || !position) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query =
    "INSERT INTO staffregistration (name, email, phonno, password, position) VALUES (?, ?, ?, ?, ?)";

  db.query(query, [name, email, phonno, password, position], (err, result) => {
    if (err) {
      console.error("Error inserting staff:", err);
      return res.status(500).json({ message: "Error registering staff" });
    }
    res.status(201).json({ message: "Staff registered successfully" });
  });
};

// Get all staff
const getStaff = (req, res) => {
  db.query("SELECT * FROM staffregistration", (err, results) => {
    if (err) {
      console.error("Error fetching staff:", err);
      return res.status(500).json({ message: "Error fetching staff" });
    }
    res.json(results);
  });
};

module.exports = { registerStaff, getStaff };
