const db = require("../configs/connect");
const answersTable = async () => {
  try {
    const [checkTable] = await db.query("SHOW TABLES LIKE 'answers'");
    if (checkTable.length === 0) {
      await db.query(`CREATE TABLE answers(
        id VARCHAR(255) PRIMARY KEY UNIQUE NOT NULL,
        quiz_question VARCHAR(255) NOT NULL,
        answer VARCHAR(255) NOT NULL,
        value INT(100) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL,
        FOREIGN KEY(quiz_question) REFERENCES quizzes(question) ON DELETE CASCADE
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
        { quizQuestion: "What is your age group?", answer: "Student", value: 1 },
        { quizQuestion: "What is your age group?", answer: "Employed", value: 2 },
        { quizQuestion: "What is your age group?", answer: "Self-employed", value: 3 },
        { quizQuestion: "What is your age group?", answer: "Unemployed", value: 1 },
        { quizQuestion: "What is your age group?", answer: "Retired", value: 3 },
        { quizQuestion: "What are your main financial goals?", answer: "Saving for a specific purchase (e.g. House, Car)", value: 2 },
        { quizQuestion: "What are your main financial goals?", answer: "Building an emergency fund", value: 3 },
        { quizQuestion: "What are your main financial goals?", answer: "Education", value: 1 },
        { quizQuestion: "What are your main financial goals?", answer: "Planning for retirement", value: 3 },
        { quizQuestion: "What are your main financial goals?", answer: "Business", value: 2 },
        { quizQuestion: "What are your main financial goals?", answer: "Miscellaneous", value: 1 },
        { quizQuestion: "How often do you track your income and expenses?", answer: "Daily", value: 3 },
        { quizQuestion: "How often do you track your income and expenses?", answer: "Weekly", value: 2 },
        { quizQuestion: "How often do you track your income and expenses?", answer: "Monthly", value: 1 },
        { quizQuestion: "How often do you track your income and expenses?", answer: "Rarely", value: 1 },
        { quizQuestion: "How often do you track your income and expenses?", answer: "Never", value: 1 },
        { quizQuestion: "What are your primary sources of income?", answer: "Salary", value: 3 },
        { quizQuestion: "What are your primary sources of income?", answer: "Business Income", value: 2 },
        { quizQuestion: "What are your primary sources of income?", answer: "Investment", value: 2 },
        { quizQuestion: "What are your primary sources of income?", answer: "Freelance/Side gigs", value: 2 },
        { quizQuestion: "What are your primary sources of income?", answer: "Passion/Retirement Funds", value: 3 },
        { quizQuestion: "What are your primary sources of income?", answer: "Others", value: 1 },
        { quizQuestion: "What is your average monthly income?", answer: "< Rp 1.000.000", value: 1 },
        { quizQuestion: "What is your average monthly income?", answer: "Rp 1.000.000 - Rp 2.499.000", value: 2 },
        { quizQuestion: "What is your average monthly income?", answer: "Rp 2.500.000 - Rp 4.499.000", value: 3 },
        { quizQuestion: "What is your average monthly income?", answer: "Rp 5.000.000 - Rp 7.499.000", value: 4 },
        { quizQuestion: "What is your average monthly income?", answer: "Rp 7.500.000 - Rp 10.000.000", value: 5 },
        { quizQuestion: "What is your average monthly income?", answer: "Rp 10.000.000+", value: 6 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Housing", value: 3 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Utilities", value: 2 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Food & Groceries", value: 3 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Transportation", value: 2 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Healthcare", value: 2 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Entertainment", value: 1 },
        { quizQuestion: "What are your biggest monthly expenses?", answer: "Education", value: 1 },
        { quizQuestion: "What type of financial advice are you most interested in?", answer: "Saving Tips", value: 3 },
        { quizQuestion: "What type of financial advice are you most interested in?", answer: "Investment advice", value: 3 },
        { quizQuestion: "What type of financial advice are you most interested in?", answer: "Debt Management", value: 2 },
        { quizQuestion: "What type of financial advice are you most interested in?", answer: "Budgeting tips", value: 2 },
        { quizQuestion: "What type of financial advice are you most interested in?", answer: "Retirement Planning", value: 3 },
        { quizQuestion: "What type of financial advice are you most interested in?", answer: "Tax Planning", value: 2 },
        { quizQuestion: "What kind of reminders would be most useful to you?", answer: "Bill paying reminders", value: 2 },
        { quizQuestion: "What kind of reminders would be most useful to you?", answer: "Saving goal reminders", value: 3 },
        { quizQuestion: "What kind of reminders would be most useful to you?", answer: "Budget Review reminders", value: 2 },
        { quizQuestion: "What kind of reminders would be most useful to you?", answer: "Investment opportunities", value: 3 },
        { quizQuestion: "What kind of reminders would be most useful to you?", answer: "Financial tips and articles", value: 2 },
      ];

      for (let i = 0; i <= answers.length; i++) {
        await db.query(`INSERT INTO answers(id, quiz_question, answer, value, created_at, updated_at) VALUES (UUID(), '${answers[i].quizQuestion}',  '${answers[i].answer}', ${answers[i].value}, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { answersTable, answerData };
