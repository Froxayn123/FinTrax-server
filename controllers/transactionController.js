const db = require("../configs/connect");

const getAllTransactions = async (req, res) => {
  try {
    const [results] = await db.query(`SELECT * FROM transactions`);
    res.status(200).json({
      payload: {
        message: "Successfully getting all transactions data user",
        datas: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransactions };
