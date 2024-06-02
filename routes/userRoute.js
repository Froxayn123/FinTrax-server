const express = require("express");
const { getUser, editUser } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");
const router = express();

router.get("/users", verifyToken, getUser);
router.get("/token", refreshToken);
router.post("/users/profile", verifyToken, editUser);

module.exports = router;
