const jwt = require("jsonwebtoken");
const db = require("../db"); // your MySQL connection
require("dotenv").config();

exports.login = (req, res) => {
  const { email, password } = req.body;

  // check user in DB
  db.query("SELECT * FROM users WHERE email = ? AND password = ?", 
    [email, password], 
    (err, results) => {
      if (err) return res.status(500).json({ message: "DB Error", error: err });
      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const user = results[0];

      // create JWT payload
      const payload = { id: user.id, role: user.role };

      // sign token
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, name: user.name, role: user.role }
      });
    }
  );
};
