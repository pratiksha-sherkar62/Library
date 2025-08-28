const { getDB } = require("../config/db");

// Get profile for both staff and student
const getProfile = async (req, res) => {
  const db = getDB();
  try {
    let table = req.user.role === "staff" ? "staffregistration" : "studentregistration";
    const [rows] = await db.execute(
      `SELECT id, name, email, phonno, ${req.user.role === "staff" ? "position" : "course"} as role_info FROM ${table} WHERE id=?`,
      [req.user.id]
    );
    if (!rows.length) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, user: rows[0], role: req.user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getProfile };
