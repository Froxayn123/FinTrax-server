const { quizTable, quizData } = require("../models/quizModel");
const { avatarTable } = require("../models/avatarModel");
const { categoryTable, categoryData } = require("../models/categoryModel");
const { transactionsTable } = require("../models/transactionsModel");
const { usersTable } = require("../models/usersModel");
const { answersTable, answerData } = require("../models/answerModel");
const { habitRecTable, habitRecData } = require("../models/habitRecommendationModel");
const { userHabitTable } = require("../models/userHabitModel");

const executeTable = async () => {
  try {
    await usersTable();
    await avatarTable();
    await categoryTable();
    await categoryData();
    await transactionsTable();
    await quizTable();
    await quizData();
    await answersTable();
    await answerData();
    await habitRecTable();
    await habitRecData();
    await userHabitTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };