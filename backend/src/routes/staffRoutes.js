const express = require("express");
const { registerStaff } = require("../controllers/staffController");

const router = express.Router();

// POST /api/staff
router.post("/", registerStaff);

module.exports = router;
