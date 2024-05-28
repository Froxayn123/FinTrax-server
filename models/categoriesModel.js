const db = require("../configs/connect");
const categoriesTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'categories'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE categories(
        id BIGINT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL,
        icon BLOB NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { categoriesTable };
