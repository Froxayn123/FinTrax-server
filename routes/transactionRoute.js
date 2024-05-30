const express = require("express");
const { getAllTransactions, addTransaction } = require("../controllers/transactionController");
const router = express();

router.get("/transaction", getAllTransactions);
router.post("/transaction", addTransaction);

module.exports = router;
