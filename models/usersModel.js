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

const usersDummy = async () => {
  try {
    const [checkDummy] = await db.query("SELECT * FROM users");
    if (checkDummy.length === 0) {
      const dummy = [
        {
          fullname: "John Cena",
          username: "johncena",
          phoneNumber: "8123456789",
          email: "johncena@gmail.com",
          password: "johncena123",
        },
        {
          fullname: "Carl Jhonson",
          username: "carljhonson",
          phoneNumber: "8987654321",
          email: "carljhonson@gmail.com",
          password: "cj123",
        },
        {
          fullname: "Liu Kang",
          username: "liukang",
          phoneNumber: "8764958321",
          email: "liukang@gmail.com",
          password: "liukang123",
        },
      ];

      for (let i = 0; i < 3; i++) {
        await db.query(
          `INSERT INTO users(id, fullname, username, phone_number, email, password, created_at, updated_at) VALUES (UUID(), '${dummy[i].fullname}', '${dummy[i].username}', '${dummy[i].phoneNumber}', '${dummy[i].email}', '${dummy[i].password}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP);`
        );
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { usersTable, usersDummy };
