const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const isAuth = require("../midelware/auth");
router.post("/signup", userController.create);
router.post("/login", userController.login);
router.get("/alluser", isAuth, userController.allData);
// router.delete("/cubic/:id",emailController.delete)
module.exports = router;
