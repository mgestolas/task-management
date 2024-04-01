const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/changePassword", authMiddleware, userController.updatePassword);

module.exports = router;
