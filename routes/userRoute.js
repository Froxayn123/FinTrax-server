const express = require("express");
const { getUser, editUser, changePhoto, deleteAccount } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/verifyToken");
const { refreshToken } = require("../controllers/refreshToken");
const upload = require("../middlewares/multer");
const router = express();

router.get("/users", verifyToken, getUser);
router.get("/token", refreshToken);
router.put("/users/profile", verifyToken, editUser);
router.put("/users/profile/photo", verifyToken, upload, changePhoto);
router.delete("/users/delete", verifyToken, deleteAccount);

module.exports = router;
