const express = require("express");
const router = express.Router();
const userController = require("../controllers/auth");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.get("/get-me", userController.getMe);

module.exports = router;
