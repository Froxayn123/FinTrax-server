const db = require("../configs/connect");

const getUser = async (req, res, next) => {
  try {
    const userId = req.userId;
    const [results] = await db.query(`SELECT username, avatar, balance FROM users WHERE id = '${userId}';`);
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
    const { username, avatar } = req.body;
    await db.query(`UPDATE users SET username = '${username}', avatar = '${avatar}', updated_at = CURRENT_TIMESTAMP() WHERE id = '${userId}';`);
    res.status(200).json({ message: "Your profile has been updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, editUser };
