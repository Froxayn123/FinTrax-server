const db = require("../configs/connect");
const habitRecommendationTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'habit_recommendations'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE habit_recommendations(
        id BIGINT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
        name VARCHAR(100) NOT NULL,
        savings_percentage DECIMAL NOT NULL,
        wants_percentage DECIMAL NOT NULL,
        needs_percentage DECIMAL NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { habitRecommendationTable };
