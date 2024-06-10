const db = require("../configs/connect");
const answersTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'answers'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE answers(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        quiz_id VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        value INT(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        FOREIGN KEY(quiz_id) REFERENCES quizzes(id) ON DELETE CASCADE
      );`);
    }
  } catch (err) {
    console.log(err);
  }
};

const answerData = async () => {
  try {
    const [checkData] = await db.query("SELECT * FROM answers");
    if (checkData.length === 0) {
      const answers = [
        { answer: "Student", value: 1 },
        { answer: "Employed", value: 2 },
        { answer: "Self-employed", value: 3 },
        { answer: "Unemployed", value: 1 },
        { answer: "Retired", value: 3 },
        { answer: "Saving for a specific purchase (e.g. House, Car)", value: 2 },
        { answer: "Building an emergency fund", value: 3 },
        { answer: "Education", value: 1 },
        { answer: "Planning for retirement", value: 3 },
        { answer: "Business", value: 2 },
        { answer: "Miscellaneous", value: 1 },
        { answer: "Daily", value: 3 },
        { answer: "Weekly", value: 2 },
        { answer: "Monthly", value: 1 },
        { answer: "Rarely", value: 1 },
        { answer: "Never", value: 1 },
        { answer: "Salary", value: 3 },
        { answer: "Business Income", value: 2 },
        { answer: "Investment", value: 2 },
        { answer: "Freelance/Side gigs", value: 2 },
        { answer: "Passion/Retirement Funds", value: 3 },
        { answer: "Others", value: 1 },
        { answer: "< Rp 1.000.000", value: 1 },
        { answer: "Rp 1.000.000 - Rp 2.499.000", value: 2 },
        { answer: "Rp 2.500.000 - Rp 4.499.000", value: 3 },
        { answer: "Rp 5.000.000 - Rp 7.499.000", value: 4 },
        { answer: "Rp 7.500.000 - Rp 10.000.000", value: 5 },
        { answer: "Rp 10.000.000+", value: 6 },
        { answer: "Housing", value: 3 },
        { answer: "Utilities", value: 2 },
        { answer: "Food & Groceries", value: 3 },
        { answer: "Transportation", value: 2 },
        { answer: "Healthcare", value: 2 },
        { answer: "Entertainment", value: 1 },
        { answer: "Education", value: 1 },
        { answer: "Saving Tips", value: 3 },
        { answer: "Investment advice", value: 3 },
        { answer: "Debt Management", value: 2 },
        { answer: "Budgeting tips", value: 2 },
        { answer: "Retirement Planning", value: 3 },
        { answer: "Tax Planning", value: 2 },
        { answer: "Bill paying reminders", value: 2 },
        { answer: "Saving goal reminders", value: 3 },
        { answer: "Budget Review reminders", value: 2 },
        { answer: "Investment opportunities", value: 3 },
        { answer: "Financial tips and articles", value: 2 },
      ];

      for (let i = 0; i <= answers.length; i++) {
        await db.query(`INSERT INTO answers(id, quiz_id, answer, value, created_at, updated_at) VALUES (UUID(), '${answers[i].answer}', ${answers[i].value}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { answersTable, answerData };
