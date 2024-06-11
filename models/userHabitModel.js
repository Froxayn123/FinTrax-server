const db = require("../configs/connect");
const userHabitTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'user_habits'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE user_habits(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        user_id VARCHAR(255) NOT NULL,
        habit_recommendation_id VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY(habit_recommendation_id) REFERENCES habit_recommendations(id) ON DELETE CASCADE);`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { userHabitTable };
