const { getDB } = require("../config/db");

const registerStaff = async (req, res) => {
  const { staffid, name, email, phonno, password, position } = req.body;

  if (!staffid || !name || !email || !phonno || !password || !position) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const db = getDB();

    const sql =
      "INSERT INTO staffregistration (staffid, name, email, phonno, password, position) VALUES (?, ?, ?, ?, ?, ?)";
    await db.execute(sql, [staffid, name, email, phonno, password, position]);

    res.status(201).json({ message: "Staff registered successfully!" });
  } catch (err) {
    console.error("❌ Error registering staff:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ message: "Email, phone, or staff ID already exists" });
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerStaff };
