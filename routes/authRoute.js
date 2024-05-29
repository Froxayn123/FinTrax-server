const express = require("express");
const { login, logout, register, confirmEmail } = require("../controllers/authController");
const { refreshToken } = require("../controllers/refreshToken");
const router = express();

router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);
router.get("/users/confirm/:token", confirmEmail);

module.exports = router;
