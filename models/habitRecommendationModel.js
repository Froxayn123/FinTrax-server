const db = require("../configs/connect");
const habitRecTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'habit_recommendations'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE habit_recommendations(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        name VARCHAR(255) UNIQUE NOT NULL,
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

const habitRecData = async () => {
  try {
    const [checkData] = await db.query("SELECT * FROM habit_recommendations");
    if (checkData.length === 0) {
      const habits = [
        { name: "Hemat", savingsPercentage: 50, wantsPercentage: 30, needsPercentage: 20 },
        { name: "Sedang", savingsPercentage: 60, wantsPercentage: 25, needsPercentage: 10 },
        { name: "Boros", savingsPercentage: 70, wantsPercentage: 20, needsPercentage: 10 },
      ];
      for (let i = 0; i <= habits.length; i++) {
        await db.query(
          `INSERT INTO habit_recommendations(id, name, savings_percentage, wants_percentage, needs_percentage, created_at, updated_at) VALUES (UUID(), '${habits[i].name}', ${habits[i].savingsPercentage}, ${habits[i].wantsPercentage}, ${habits[i].needsPercentage}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { habitRecTable, habitRecData };
