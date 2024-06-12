const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { submitQuiz } = require("../controllers/quizController");
const router = express();

router.post("/quiz", verifyToken, submitQuiz);

module.exports = router;
