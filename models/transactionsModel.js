const db = require("../configs/connect");
const transactionsTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'transactions'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE transactions(
        id BIGINT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
        user_id BIGINT,
        category_id BIGINT,
        name_detail VARCHAR(100) NOT NULL,
        type ENUM("payment","receive") NOT NULL,
        amount DECIMAL(15,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(category_id) REFERENCES categories(id)
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { transactionsTable };
