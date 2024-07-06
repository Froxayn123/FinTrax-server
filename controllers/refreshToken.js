const jwt = require("jsonwebtoken");
const db = require("../configs/connect");

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    const [user] = await db.query(
      `SELECT users.id, users.fullname, users.username, users.email, avatars.avatar_url, users.balance, user_habits.habit_name, habit_recommendations.savings_percentage, habit_recommendations.wants_percentage, habit_recommendations.needs_percentage FROM users LEFT JOIN avatars ON users.id = avatars.user_id LEFT JOIN user_habits ON users.id = user_habits.user_id LEFT JOIN habit_recommendations ON user_habits.habit_name = habit_recommendations.name WHERE users.refresh_token = '${refreshToken}';`
    );
    if (!user[0]) return res.sendStatus(403);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.sendStatus(403);
      const userId = user[0].id;
      const fullname = user[0].fullname;
      const username = user[0].username;
      const email = user[0].email;
      const avatarUrl = user[0].avatar_url;
      const balance = user[0].balance;
      const habitName = user[0].habit_name;
      const savingsPercentage = user[0].savings_percentage;
      const wantsPercentage = user[0].wants_percentage;
      const needsPercentage = user[0].needs_percentage;
      const accessToken = jwt.sign({ userId, fullname, username, email, avatarUrl, balance, habitName, savingsPercentage, wantsPercentage, needsPercentage }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { refreshToken };
