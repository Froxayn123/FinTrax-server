const db = require("../configs/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../email/sendEmail");

const register = async (req, res, next) => {
  try {
    const { fullname, username, phoneNumber, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ message: "Password and Confirm Paswword doesn't match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const authToken = jwt.sign({ fullname, username, phoneNumber, email, hashPassword }, process.env.AUTH_TOKEN_SECRET, {
      expiresIn: "30m",
    });
    const link = `${process.env.CORS}/verification?emailToken=${authToken}`;
    await sendEmail(email, "Verify Your Email Address for FinTrax", link, fullname);
    res.status(201).json({
      payload: {
        message: "Email Verification link sent to your email",
      },
    });
  } catch (error) {
    next(error);
  }
};

const confirmEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    jwt.verify(token, process.env.AUTH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(403);
      req.fullname = decoded.fullname;
      req.username = decoded.username;
      req.phoneNumber = decoded.phoneNumber;
      req.email = decoded.email;
      req.hashPassword = decoded.hashPassword;
    });
    const fullname = req.fullname;
    const username = req.username;
    const phoneNumber = req.phoneNumber;
    const email = req.email;
    const hashPassword = req.hashPassword;

    if (fullname == undefined) return res.status(410).json({ payload: { message: "Verification link has been expired" } });

    const [checkuser] = await db.query(`SELECT * FROM users WHERE email = '${email}';`);
    if (checkuser.length !== 0) return res.status(200).json({ payload: { message: "Email is already verified, Redirecting..." } });
    await db.query(
      `INSERT INTO users(id, role, fullname, email, password, phone_number, username, refresh_token, email_verified_at, created_at, updated_at) VALUES(UUID(), 'user', '${fullname}', '${email}', '${hashPassword}', '${phoneNumber}', '${username}', '${token}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`
    );

    const [user] = await db.query(
      `SELECT users.id, users.fullname, users.username, avatars.avatar_url, users.balance, user_habits.habit_name, habit_recommendations.savings_percentage, habit_recommendations.wants_percentage, habit_recommendations.needs_percentage FROM users LEFT JOIN avatars ON users.id = avatars.user_id LEFT JOIN user_habits ON users.id = user_habits.user_id LEFT JOIN habit_recommendations ON user_habits.habit_name = habit_recommendations.name WHERE users.email = '${email}';`
    );

    const userId = user[0].id;
    const avatarUrl = user[0].avatar_url;
    const balance = user[0].balance;
    const habitName = user[0].habit_name;
    const savingsPercentage = user[0].savings_percentage;
    const wantsPercentage = user[0].wants_percentage;
    const needsPercentage = user[0].needs_percentage;

    const refreshToken = jwt.sign({ userId, fullname, username, email, avatarUrl, balance, habitName, savingsPercentage, wantsPercentage, needsPercentage }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    await db.query(`UPDATE users SET refresh_token = '${refreshToken}' WHERE id = '${userId}'`);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      payload: {
        message: "Email has been successfully verified, Redirecting...",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const [user] = await db.query(
      `SELECT users.id, users.fullname, users.username, users.email, users.password, avatars.avatar_url, users.balance, user_habits.habit_name, habit_recommendations.savings_percentage, habit_recommendations.wants_percentage, habit_recommendations.needs_percentage FROM users LEFT JOIN avatars ON users.id = avatars.user_id LEFT JOIN user_habits ON users.id = user_habits.user_id LEFT JOIN habit_recommendations ON user_habits.habit_name = habit_recommendations.name WHERE users.email = '${req.body.email}';`
    );
    if (user[0].role == "admin") {
      const match = (await user[0].password) == req.body.password;
      if (!match) return res.status(400).json({ payload: { message: "Wrong Password" } });
      const userId = user[0].id;
      const fullname = user[0].fullname;
      const username = user[0].username;
      const email = user[0].email;
      const accessToken = jwt.sign({ userId, fullname, username, email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "20s",
      });
      const refreshToken = jwt.sign({ userId, fullname, username, email }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      await db.query(`UPDATE users SET refresh_token = '${refreshToken}' WHERE id = '${userId}'`);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json({ accessToken });
    }
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ payload: { message: "Wrong Password" } });
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
    const refreshToken = jwt.sign({ userId, fullname, username, email, avatarUrl, balance, habitName, savingsPercentage, wantsPercentage, needsPercentage }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await db.query(`UPDATE users SET refresh_token = '${refreshToken}' WHERE id = '${userId}'`);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ payload: { message: "Your account is not registered" } });
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    const [user] = await db.query(`SELECT * FROM users WHERE refresh_token = '${refreshToken}';`);
    if (!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await db.query(`UPDATE users SET refresh_token = null WHERE id = '${userId}';`);
    res.clearCookie("refreshToken");
    return res.status(200).json({ payload: { message: "You have successfully logged out" } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, logout, confirmEmail };
