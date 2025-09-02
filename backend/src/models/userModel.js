// userModel.js
const { getDB } = require("../config/db");

const User = {
  create: async (userData) => {
    const db = getDB(); // call here, not at import
    const { name, email, password } = userData;
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result;
  },

  findByEmail: async (email) => {
    const db = getDB();
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  }
};

module.exports = User;
