const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.PORTDB,
});

db.getConnection()
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database Not Connected \n" + err));

module.exports = db;
