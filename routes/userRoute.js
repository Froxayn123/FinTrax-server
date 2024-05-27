const express = require("express");
const { getUser, register, login, logout } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");
const router = express();

router.get("/users", verifyToken, getUser);
router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

module.exports = router;
