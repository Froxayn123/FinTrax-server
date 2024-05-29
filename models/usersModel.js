const db = require("../configs/connect");
const usersTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'users'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE users(
        id VARCHAR(36) PRIMARY KEY NOT NULL,
        fullname CHAR(100) NOT NULL,
        username VARCHAR(100) NOT NULL,
        phone_number VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(100) NOT NULL,
        avatar BLOB,
        balance DECIMAL(15,2),
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
