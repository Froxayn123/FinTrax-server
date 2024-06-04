const { avatarTable } = require("../models/avatarModel");
const { transactionsTable } = require("../models/transactionsModel");
const { usersTable } = require("../models/usersModel");

const executeTable = async () => {
  try {
    await usersTable();
    avatarTable();
    transactionsTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };
