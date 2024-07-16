const db = require("../configs/connect");
const { addition } = require("../middlewares/calculator");

const getAllTransactions = async (req, res, next) => {
  try {
    const userId = req.userId;
    const [results] = await db.query(`SELECT * FROM transactions WHERE user_id = '${userId}'`);
    if (results.length == 0) return res.status(200).json({ message: "No transactions found" });
    return res.status(200).json({
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
    const userId = req.userId;
    const { type, categoryName, amount, detail } = req.body;
    const [checkCategory] = await db.query(`SELECT name FROM categories WHERE name = '${categoryName}'`);
    if (type !== "income" && type !== "expenses") return res.status(404).json({ message: "Type is not found" });
    if (checkCategory.length == 0) return res.status(404).json({ message: "Category is not found" });
    await db.query(
      `INSERT INTO transactions(id, user_id, category_name, type, amount, detail, icon, created_at, updated_at) VALUES(UUID(), '${userId}', '${categoryName}', '${type}', ${amount}, '${detail}', '/assets/${categoryName}.png', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP());`
    );

    if (type == "income") {
      const [balanceUser] = await db.query(`SELECT balance FROM users WHERE id = '${userId}'`);

      const final = [];
      final[0] = Number(balanceUser[0].balance);
      final[1] = amount;

      const sum = addition(final);

      await db.query(`UPDATE users SET balance = ${sum} WHERE id = '${userId}';`);
    }

    if (type == "expenses") {
      const [balanceUser] = await db.query(`SELECT balance FROM users WHERE id = '${userId}'`);

      const final = [];
      final[0] = Number(balanceUser[0].balance);
      final[1] = -amount;

      const sum = addition(final);

      await db.query(`UPDATE users SET balance = ${sum} WHERE id = '${userId}';`);
    }

    res.status(200).json({ message: "Successfully added new transaction" });
  } catch (error) {
    next(error);
  }
};

const deleteTransaction = async (req, res, next) => {
  try {
    const transId = req.params.id;
    if (!transId) return res.status(404).json({ message: "Transaction not found" });
    await db.query(`DELETE FROM transactions WHERE id = '${transId}'`);
    res.status(200).json({ message: "Successfully deleted transaction" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransactions, addTransaction, deleteTransaction };
