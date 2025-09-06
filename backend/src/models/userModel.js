// userModel.js
const { getDB } = require("../config/db");

const User = {
  create: async (userData) => {
    const db = getDB(); // ✅ Call inside function
    const { userId, name, phone, email, role, password, photo } = userData;

    const [result] = await db.query(
      `INSERT INTO users (userId, name, phone, email, role, password, photo) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, name, phone, email, role, password, photo]
    );
    return result;
  },

  findByEmail: async (email) => {
    const db = getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0]; // return single user if found
  },

  findByUserId: async (userId) => {
    const db = getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE userId = ?", [userId]);
    return rows[0];
  }
};

module.exports = User;
