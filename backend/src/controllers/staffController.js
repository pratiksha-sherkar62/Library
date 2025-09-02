// const { getDB } = require("../config/db");
// const { get } = require("../routes/staffRoutes");

// // Register staff
// const registerStaff = async (req, res) => {
//   const { name, email, phonno, password, position } = req.body;

//   if (!name || !email || !phonno || !password || !position) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const db = getDB();
//     const query =
//       "INSERT INTO staffregistration (name, email, phonno, password, position) VALUES (?, ?, ?, ?, ?)";
    
//     await db.execute(query, [name, email, phonno, password, position]);

//     res.status(201).json({ message: "Staff registered successfully" });
//   } catch (err) {
//     console.error("Error inserting staff:", err);

//     if (err.code === "ER_DUP_ENTRY") {
//       return res.status(400).json({ message: "Email or phone already exists" });
//     }

//     res.status(500).json({ message: "Error registering staff" });
//   }
// };

// const loginStaff = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const db = getDB();
//     const [rows] = await db.execute("SELECT * FROM staffregistration WHERE email = ? AND password = ?",[email, password]);
//     if (rows.length > 0) {
//       res.json({ success: true, staff: rows[0] });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (err) {
//     console.error("Error fetching staff:", err);
//     res.status(500).json({ message: "Error fetching staff" });
//   }
// };

// const getStaff = async (req, res) => {
//   try {
//     const db = getDB();
//     const [rows] = await db.execute("SELECT * FROM staffregistration");
//     res.json(rows);
//   } catch (err) {
//     console.error("Error fetching staff:", err);
//     res.status(500).json({ message: "Error fetching staff" });
//   }
// };

// module.exports = { registerStaff, getStaff, loginStaff };
