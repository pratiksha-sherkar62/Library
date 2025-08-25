const { getDB } = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = "./uploads";
       if(!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}${ext}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

const getUserProfile = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const db = getDB();
    const [rows] = await db.execute(
      `SELECT PRN, name, email, phoneno, class, profileImage, NULL AS staffid, NULL AS position
       FROM studentregistration WHERE email = ?
       UNION ALL
       SELECT NULL AS PRN, name, email, phonno AS phoneno, NULL AS class, profileImage, staffid, position
       FROM staffregistration WHERE email = ?`,
      [email, email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUserProfile = async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const { name, phoneno, class: userClass, position } = req.body;
  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename; // Get uploaded filename
  }

  try {
    const db = getDB();

    // Check student
    const [studentRows] = await db.execute(
      "SELECT * FROM studentregistration WHERE email = ?",
      [email]
    );

    if (studentRows.length > 0) {
      const query = profileImage
        ? "UPDATE studentregistration SET name=?, phoneno=?, class=?, profileImage=? WHERE email=?"
        : "UPDATE studentregistration SET name=?, phoneno=?, class=? WHERE email=?";
      const params = profileImage
        ? [name, phoneno, userClass, profileImage, email]
        : [name, phoneno, userClass, email];

      await db.execute(query, params);
      return res.json({ message: "Student profile updated successfully!" });
    }

    // Check staff
    const [staffRows] = await db.execute(
      "SELECT * FROM staffregistration WHERE email = ?",
      [email]
    );

    if (staffRows.length > 0) {
      const query = profileImage
        ? "UPDATE staffregistration SET name=?, phonno=?, position=?, profileImage=? WHERE email=?"
        : "UPDATE staffregistration SET name=?, phonno=?, position=? WHERE email=?";
      const params = profileImage
        ? [name, phoneno, position, profileImage, email]
        : [name, phoneno, position, email];

      await db.execute(query, params);
      return res.json({ message: "Staff profile updated successfully!" });
    }

    return res.status(404).json({ message: "User not found" });
  } catch (err) {
    console.error("Error updating user profile:", err);
    return res.status(500).json({ message: "Failed to update profile." });
  }
};


module.exports = { getUserProfile, updateUserProfile, upload };