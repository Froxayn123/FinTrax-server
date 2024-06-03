const db = require("../configs/connect");
const transactionsTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'transactions'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE transactions(
        id VARCHAR(255) PRIMARY KEY NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        type ENUM("income","expenses") NOT NULL,
        amount DECIMAL(15,2),
        detail TEXT,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        CONSTRAINT FK_userTransaction FOREIGN KEY(user_id) REFERENCES users(id)
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { transactionsTable };
