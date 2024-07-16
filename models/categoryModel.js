const db = require("../configs/connect");
const categoryTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'categories'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE categories(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        name ENUM("Food & Beverages", "Education", "Transportation", "Housing", "Healthcare", "Entertainment", "Fashion", "Makeup", "Skincare", "Bodycare", "Travel & Holidays", "Technology", "Debt Payment", "Donate", "Investment", "Miscellaneous Expense", "Lainnya") UNIQUE NOT NULL,
        filename VARCHAR(255) NULL,
        category_url VARCHAR(255) NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

const categoryData = async () => {
  try {
    const [checkData] = await db.query("SELECT * FROM categories");
    if (checkData.length === 0) {
      const category = [
        "Food & Beverages",
        "Education",
        "Transportation",
        "Housing",
        "Healthcare",
        "Entertainment",
        "Fashion",
        "Makeup",
        "Skincare",
        "Bodycare",
        "Travel & Holidays",
        "Technology",
        "Debt Payment",
        "Donate",
        "Investment",
        "Miscellaneous Expense",
        "Lainnya",
      ];
      for (let i = 0; i <= category.length; i++) {
        await db.query(`INSERT INTO categories(id, name, filename, category_url, created_at, updated_at) VALUES (UUID(), '${category[i]}', '${category[i]}.png', '/public/${category[i]}.png', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { categoryTable, categoryData };
