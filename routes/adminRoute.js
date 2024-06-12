const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");
const { getAllUsers } = require("../controllers/adminController");
const router = express();

router.get("/admin/control", verifyToken, getAllUsers);
router.get("/token", refreshToken);

module.exports = router;
