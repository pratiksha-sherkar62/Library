// src/config/db.js
require("dotenv").config();
const mysql = require("mysql2/promise");

let pool;

async function initDB() {
  pool = await mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpass,
    database: process.env.dbname,
    port: process.env.dbserver,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log("Database connection established");
}

function getDB() {
  if (!pool) throw new Error("Database not initialized. Call initDB() first.");
  return pool;
}

module.exports = { initDB, getDB };
