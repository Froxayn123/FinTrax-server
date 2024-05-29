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
    res.status(500).json({
      payload: {
        message: "Something Went Wrong!",
      },
    });
    next(error);
  }
};

module.exports = { getUser };
