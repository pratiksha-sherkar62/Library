// const { getDB } = require("../config/db");

// const registerStudent = async (req, res) => {
//   const { PRN, name, email, phoneno, password, class:StudentClass } = req.body;

//   if (!PRN || !name || !email || !phoneno || !password || !StudentClass) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   try {
//     const db = getDB();

//     const sql =
//   "INSERT INTO studentregistration (PRN, name, email, phoneno, password, class) VALUES (?, ?, ?, ?, ?, ?)";

//     await db.execute(sql, [PRN, name, email, phoneno, password, StudentClass]);

//     res.status(201).json({ message: "Student registered successfully!" });
//   } catch (err) {
//     console.error("❌ Error registering student:", err);

//     if (err.code === "ER_DUP_ENTRY") {
//       return res
//         .status(400)
//         .json({ message: "Email, phone, or prn already exists" });
//     }

//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const StudLog = async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password are required" });
//   }

//   try {
//     const db = getDB();
//     const [rows] = await db.execute("SELECT * FROM studentregistration WHERE email = ? AND password = ?",[email, password]);
//     if (rows.length > 0) {
//       res.json({ success: true, student: rows[0] });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (err) {
//     console.error("❌ Error fetching student:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
// // Get all students
// const getStudents = async (req, res) => {
//   try {
//     const db = getDB();
//     const [rows] = await db.execute("SELECT * FROM studentregistration");
//     res.json(rows);
//   } catch (err) {
//     console.error("❌ Error fetching students:", err);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = { registerStudent, getStudents, StudLog };