const db = require("../configs/connect");
const transactionsTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'transactions'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE transactions(
        id VARCHAR(36) PRIMARY KEY NOT NULL,
        user_id VARCHAR(36) NOT NULL,
        type ENUM("income","expenses") NOT NULL,
        amount DECIMAL(15,2),
        name_detail VARCHAR(100) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { transactionsTable };
