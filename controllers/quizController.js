const db = require("../configs/connect");

const submitQuiz = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { answer } = req.body;
    const [user] = await db.query(`SELECT * FROM users WHERE id = '${userId}';`);
    if (!user) return res.sendStatus(403);
    if (!answer) return res.sendStatus(400);
    const userAge = answer[0];
    const userCountry = answer[1];
    await db.query(`UPDATE users SET age = '${userAge}', country = '${userCountry}', updated_at = CURRENT_TIMESTAMP() WHERE id = '${userId}';`);
    const answerUser = [answer[2], answer[3], answer[4], answer[5], answer[6], answer[7], answer[8], answer[10], answer[11]];
    const [valueAnswerDB] = await db.query(
      `SELECT value FROM answers WHERE answer = '${answerUser[0]}' OR answer = '${answerUser[1]}' OR answer = '${answerUser[2]}' OR answer = '${answerUser[3]}' OR answer = '${answerUser[4]}' OR answer = '${answerUser[5]}' OR answer = '${answerUser[6]}' OR answer = '${answerUser[7]}' OR answer = '${answerUser[8]}';`
    );
    const totalValueUserAnswer = valueAnswerDB.map((item) => item.value).reduce((acc, curr) => acc + curr, 0);

    if (totalValueUserAnswer >= 30) {
      await db.query(`INSERT INTO user_habits(id, user_id, habit_recommendation_id, created_at, updated_at) VALUES(UUID(), '${userId}', 'f8a26d96-278e-11ef-b0ec-c018033d3580', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      return res.status(200).json({
        payload: { message: "Your answers has been successfully saved" },
      });
    }

    if (totalValueUserAnswer > 15 && totalValueUserAnswer < 30) {
      await db.query(`INSERT INTO user_habits(id, user_id, habit_recommendation_id, created_at, updated_at) VALUES(UUID(), '${userId}', 'f8a37d8b-278e-11ef-b0ec-c018033d3580', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      return res.status(200).json({
        payload: { message: "Your answers has been successfully saved" },
      });
    }

    if (totalValueUserAnswer <= 15) {
      await db.query(`INSERT INTO user_habits(id, user_id, habit_recommendation_id, created_at, updated_at) VALUES(UUID(), '${userId}', 'f8a3b630-278e-11ef-b0ec-c018033d3580', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      return res.status(200).json({
        payload: { message: "Your answers has been successfully saved" },
      });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { submitQuiz };
