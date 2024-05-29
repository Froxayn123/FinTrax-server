const express = require("express");
const { getUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");
const router = express();

router.get("/users", verifyToken, getUser);
router.get("/token", refreshToken);

module.exports = router;
