const db = require("../configs/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../email/sendEmail");
const { random } = require("../middlewares/randomStrings");

const register = async (req, res, next) => {
  try {
    const { fullname, username, phoneNumber, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ message: "Password and Confirm Paswword doesn't match" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const token = random(500);
    const link = `${process.env.BASE_URL}/register/confirm/${token}/${username}/${phoneNumber}/${hashPassword}/${email}/${fullname}`;
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
    const { token, user, phone, hash, ema, full } = req.params;
    const [checkuser] = await db.query(`SELECT * FROM users WHERE refresh_token = '${token}';`);
    if (!checkuser) return res.status(400).json({ message: "Email is already verified" });
    await db.query(
      `INSERT INTO users(id, fullname, email, password, phone_number, username, refresh_token, email_verified_at, created_at, updated_at) VALUES (UUID(), '${full}', '${ema}', '${hash}', '${phone}', '${user}', '${token}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`
    );
    return res.status(200).json({
      payload: {
        message: "Email has been successfully verified",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const [user] = await db.query(`SELECT * FROM users WHERE email = '${req.body.email}';`);
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ message: "Wrong Password" });
    const userId = user[0].id;
    const username = user[0].username;
    const email = user[0].email;
    const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    await db.query(`UPDATE users SET refresh_token = '${refreshToken}' WHERE id = '${userId}'`);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ payload: { message: "Email is not found" } });
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
    return res.status(200).json({ payload: { message: "You have been logged out" } });
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login, logout, confirmEmail };
