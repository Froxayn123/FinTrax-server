const { avatarTable } = require("../models/avatarModel");
const { categoryTable, categoryData } = require("../models/categoryModel");
const { transactionsTable } = require("../models/transactionsModel");
const { usersTable } = require("../models/usersModel");

const executeTable = async () => {
  try {
    await usersTable();
    await avatarTable();
    await categoryTable();
    await categoryData();
    await transactionsTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };
