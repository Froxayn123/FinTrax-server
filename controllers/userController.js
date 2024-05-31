const db = require("../configs/connect");

const getUser = async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT fullname, username, email FROM users`);
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
    const { avatar, username } = req.body;
    await db.query(`UPDATE users SET username = '${username}', avatar = '${avatar}', updated_at = CURRENT_TIMESTAMP()`);
    res.status(200).json({ message: "Your profile has been updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUser, editUser };
