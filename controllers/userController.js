const db = require("../configs/connect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const [results] = await db.query(`SELECT id, fullname, email FROM users`);
    res.status(200).json({
      payload: {
        message: "Berhasil mengambil semua data users",
        datas: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res) => {
  try {
    const { fullname, username, phoneNumber, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ message: "Password dan Confirm Password tidak cocok" });
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const [results] = await db.query(`INSERT INTO users(fullname, email, password, phone_number, username) VALUES ('${fullname}', '${email}', '${hashPassword}', '${phoneNumber}', '${username}')`);
    res.status(201).json({
      payload: {
        message: "register berhasil",
        datas: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const [user] = await db.query(`SELECT * FROM users WHERE username = '${req.body.username}';`);
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
    await db.query(`UPDATE users SET refresh_token = '${refreshToken}' WHERE id = ${userId}`);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ message: "username tidak ditemukan" });
  }
};

const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const [user] = await db.query(`SELECT * FROM users WHERE refresh_token = '${refreshToken}';`);
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await db.query(`UPDATE users SET refresh_token = null WHERE id = '${userId}';`);
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

module.exports = { getUser, register, login, logout };
