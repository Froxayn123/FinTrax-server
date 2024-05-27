const db = require("../configs/connect");

const getAllUsers = async (req, res) => {
  try {
    const [results] = await db.query(`SELECT * FROM users`);
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

module.exports = { getAllUsers };
