// routes/adminRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = getDB();

  try {
    const [rows] = await db.query('SELECT * FROM admins WHERE username = ?', [username]);
    if (rows.length === 0 || rows[0].password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const admin = rows[0];
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('Admin login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
