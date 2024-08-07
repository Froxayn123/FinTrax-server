const db = require("../configs/connect");
const usersTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'users'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE users(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        role ENUM("user", "admin") NOT NULL,
        fullname CHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        phone_number VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        balance DECIMAL(30,2),
        age ENUM("Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65 above"),
        country CHAR(50),
        refresh_token TEXT,
        email_verified_at TIMESTAMP,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP);`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { usersTable };
