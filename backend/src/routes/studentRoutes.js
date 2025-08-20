

const express = require("express");
const { registerStudent, getStudents } = require("../controllers/studentController");

const router = express.Router();

// Register student
router.post("/register", registerStudent);

// Get all students
router.get("/", getStudents);

module.exports = router;
