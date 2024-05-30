const { transactionsTable } = require("../models/transactionsModel");
const { usersTable, usersDummy } = require("../models/usersModel");

const executeTable = async () => {
  try {
    await usersTable();
    usersDummy();
    transactionsTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };
