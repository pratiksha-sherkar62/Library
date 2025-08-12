require("dotenv").config();

let mysql = require("mysql2/promise");

let conn=mysql.createConnection({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpass,
    database: process.env.dbname,
    port: process.env.dbserver
})

console.log("Database connection established");
module.exports = conn;