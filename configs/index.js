const { transactionsTable } = require("../models/transactionsModel");
const { usersTable } = require("../models/usersModel");

const executeTable = async () => {
  try {
    await usersTable();
    transactionsTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };
