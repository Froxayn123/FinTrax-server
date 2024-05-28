const db = require("../configs/connect");
const userHabitsTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'user_habits'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE user_habits(
        id BIGINT PRIMARY KEY UNIQUE AUTO_INCREMENT NOT NULL,
        user_id BIGINT,
        habit_recommendation_id BIGINT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id),
        FOREIGN KEY(habit_recommendation_id) REFERENCES habit_recommendations(id)
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { userHabitsTable };
