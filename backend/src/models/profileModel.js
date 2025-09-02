const { getDB } = require("../config/db");

const Profile = {
    create: async (profileData) => {
        const db = getDB();
        const { user_id, name, phone, profile_pic, role, class_number, prn_number } = profileData;
        const [result] = await db.query(
            `INSERT INTO profiles (user_id, name, phone, profile_pic, role, class_number, prn_number) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, name, phone, profile_pic, role, class_number, prn_number]
        );
        return result;
    },

    findByUserId: async (user_id) => {
        const db = getDB();
        const [rows] = await db.query("SELECT * FROM profiles WHERE user_id = ?", [user_id]);
        return rows;
    }
};

module.exports = Profile;
