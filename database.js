const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "kishor",
  database: process.env.MYSQLDATABASE || "project",
  port: process.env.MYSQLPORT || 3306
});

db.getConnection((err, conn) => {
  if (err) {
    console.log("DB ERROR:", err);
  } else {
    console.log("DB CONNECTED");
    conn.release();
  }
});

module.exports = db;