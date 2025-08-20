const express = require("express");
const { registerStaff, getStaff } = require("../controllers/staffController");

const router = express.Router();

// Register staff
router.post("/", registerStaff);

// Get all staff
router.get("/", getStaff);

module.exports = router;
