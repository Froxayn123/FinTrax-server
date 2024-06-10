const db = require("../configs/connect");
const habitRecTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'habit_recommendations'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE habit_recommendations(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        savings_percentage INT(100) NOT NULL,
        wants_percentage INT(100) NOT NULL,
        needs_percentage INT(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL);`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { habitRecTable };
