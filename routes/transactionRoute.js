const express = require("express");
const { getAllTransactions } = require("../controllers/transactionController");
const router = express();

router.get("/transaction", getAllTransactions);

module.exports = router;
