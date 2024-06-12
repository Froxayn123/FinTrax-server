const express = require("express");
const { login, logout, register, confirmEmail } = require("../controllers/authController");
const { refreshToken } = require("../controllers/refreshToken");
const { handlingError } = require("../middlewares/handlingError");
const router = express();

router.post("/register", register, handlingError);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);
router.get("/register/confirm/:token", confirmEmail);

module.exports = router;
