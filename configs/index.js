const { categoriesTable } = require("../models/categoriesModel");
const { habitRecommendationTable } = require("../models/habitRecommendationsModel");
const { transactionsTable } = require("../models/transactionsModel");
const { userHabitsTable } = require("../models/userHabitsModels");
const { usersTable } = require("../models/usersModel");

const executeTable = async () => {
  try {
    await usersTable();
    transactionsTable();
    categoriesTable();
    userHabitsTable();
    habitRecommendationTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };
