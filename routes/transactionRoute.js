const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { getAllTransactions, addTransaction, deleteTransaction } = require("../controllers/transactionController");
const router = express();

router.get("/transactions", verifyToken, getAllTransactions);
router.post("/transaction/add", verifyToken, addTransaction);
router.delete("/transaction/delete/:id", verifyToken, deleteTransaction);

module.exports = router;
