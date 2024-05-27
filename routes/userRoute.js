const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const router = express();

router.get("/users", getAllUsers);

module.exports = router;
