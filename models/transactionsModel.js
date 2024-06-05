const db = require("../configs/connect");
const transactionsTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'transactions'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE transactions(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        category_name ENUM("Food & Beverages", "Education", "Transportation", "Housing", "Healthcare", "Entertainment", "Fashion", "Makeup", "Skincare", "Bodycare", "Travel & Holidays", "Technology", "Debt Payment", "Donate", "Investment", "Miscellaneous Expense") NOT NULL,
        type ENUM("income","expenses") NOT NULL,
        amount DECIMAL(15,2),
        detail TEXT,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(category_name) REFERENCES categories(name) ON DELETE CASCADE
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { transactionsTable };
