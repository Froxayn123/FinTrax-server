const db = require("../configs/connect");
const avatarTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'avatars'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE avatars(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        filename VARCHAR(255) NOT NULL,
        url VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        CONSTRAINT FK_userAvatar FOREIGN KEY(user_id) REFERENCES users(id)
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { avatarTable };
