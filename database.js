const mysql = require("mysql2");

const db = mysql.createPool({
  host: process.env.MYSQLHOST ,
  user: process.env.MYSQLUSER ,
  password: process.env.MYSQLPASSWORD ,
  database: process.env.MYSQLDATABASE ,
  port: process.env.MYSQLPORT 
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