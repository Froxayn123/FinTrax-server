const db = require("../configs/connect");
const fs = require("fs");

const getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.sendStatus(403);
    const [results] = await db.query(`SELECT users.fullname, users.username, avatars.avatar_url, users.balance FROM users LEFT JOIN avatars ON users.id = avatars.user_id WHERE users.id = '${userId}';`);
    res.status(200).json({
      payload: {
        message: "User data has been successfully fetched",
        datas: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const editUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.sendStatus(403);
    const { username, age, country } = req.body;
    await db.query(`UPDATE users SET username = '${username}', age = '${age}', country = '${country}', updated_at = CURRENT_TIMESTAMP() WHERE id = '${userId}';`);
    res.status(200).json({ message: "Your profile has been updated" });
  } catch (error) {
    next(error);
  }
};

const changePhoto = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.sendStatus(403);
    const [avatar] = await db.query(`SELECT * FROM avatars WHERE user_id = '${userId}';`);
    if (avatar.length == 0) {
      const pathAvatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
      await db.query(`INSERT INTO avatars(id, user_id, filename, avatar_url, created_at, updated_at) VALUES (UUID(), '${userId}', '${req.file.filename}', '${pathAvatar}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
      return res.status(201).json({ message: "Your Photo has been changed" });
    }
    const filepath = `./public/images/${avatar[0].filename}`;
    fs.unlinkSync(filepath);
    const pathAvatar = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    await db.query(`UPDATE avatars SET filename = '${req.file.filename}', avatar_url = '${pathAvatar}', updated_at = CURRENT_TIMESTAMP() WHERE user_id = '${userId}';`);

    return res.status(200).json({ message: "Your Photo has been changed" });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.userId;
    if (!userId) return res.sendStatus(401);
    const [checkuser] = await db.query(`SELECT users.*, avatars.filename  FROM users LEFT JOIN avatars ON users.id = avatars.user_id WHERE users.id = '${userId}';
    `);
    if (checkuser.length === 0) return res.sendStatus(404);
    if (req.body.confirm !== "DELETE") return res.status(400).json({ message: "Wrong Confirm" });
    const filepath = `./public/images/${checkuser[0].filename}`;
    fs.unlinkSync(filepath);
    await db.query(`DELETE FROM users WHERE id = '${userId}'`);
    res.clearCookie("refreshToken");
    return res.status(200).json({ payload: { message: "You have successfully deleted your account" } });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, editUser, changePhoto, deleteAccount };
