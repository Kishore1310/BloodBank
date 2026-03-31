const mysql=require("mysql2")

const db=mysql.createPool({
  host:"localhost",
  user:"root",
  password:"kishor",
  database:"project",
});

module.exports=db;