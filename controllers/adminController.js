const db = require("../configs/connect");

const getAllUsers = async (req, res, next) => {
  try {
    const [results] = db.query(`SELECT users.id users.username, avatars.avatar_url, users.email, users.created_at FROM users LEFT JOIN avatars ON users.id = avatars.user_id;`);
    if (results.length == 0) return res.status(200).json({ message: "No Users Registered" });
    return res.status(200).json({
      payload: {
        results: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers };
