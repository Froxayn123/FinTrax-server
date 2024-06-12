const db = require("../configs/connect");
const quizTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'quizzes'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE quizzes(
        id VARCHAR(255) NOT NULL,
        number INT(100) NOT NULL,
        question VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

const quizData = async () => {
  try {
    const [checkData] = await db.query("SELECT * FROM quizzes");
    if (checkData.length === 0) {
      const quizzes = [
        "What is your age group?",
        "Where do you live now?",
        "What is your employment status?",
        "What are your main financial goals?",
        "How often do you track your income and expenses?",
        "What are your primary sources of income?",
        "What is your average monthly income?",
        "What are your biggest monthly expenses?",
        "What type of financial advice are you most interested in?",
        "How would you like to receive notifications and reminders?",
        "What kind of reminders would be most useful to you?",
        "How often would you like to receive updates on your financial status?",
      ];
      for (let i = 0; i < quizzes.length; i++) {
        await db.query(`INSERT INTO quizzes(id, number, question, created_at, updated_at) VALUES (UUID(), ${i}, '${quizzes[i]}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { quizTable, quizData };
