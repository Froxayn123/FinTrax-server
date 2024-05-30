const db = require("../configs/connect");

const getAllTransactions = async (req, res, next) => {
  try {
    const [results] = await db.query(`SELECT * FROM transactions WHERE user_id = '${req.body.userId}'`);
    if (!results) return res.status(404).json({ message: "No transactions found" });
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

const addTransaction = async (req, res, next) => {
  try {
    const { userId, type, amount, detail } = req.body;
    await db.query(`INSERT INTO transactions(id, user_id, type, amount, detail, created_at, updated_at) VALUES(UUID(), '${userId}', '${type}', '${amount}', '${detail}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`);
    res.status(200).json({ message: "Successfully added new transaction" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransactions, addTransaction };
