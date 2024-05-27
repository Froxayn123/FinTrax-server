const db = require("../configs/connect");
const usersTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'users'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE users(
        id BIGINT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
        fullname CHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100),
        phone_number VARCHAR(24) NOT NULL,
        avatar BLOB,
        username VARCHAR(30) NOT NULL,
        refresh_token TEXT,
        email_verified_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        deleted_at TIMESTAMP);`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { usersTable };
