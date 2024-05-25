const { usersTable } = require("../models/usersModel");

const executeTable = async () => {
  try {
    await usersTable();
  } catch (err) {
    console.log("Execute Table Failed" + err);
  }
};

module.exports = { executeTable };
