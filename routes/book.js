const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const isAuth = require("../midelware/auth");

router.get("/getAll",isAuth, bookController.allData);
router.get("/getById/:id",isAuth, bookController.getBookById);
router.put("/updateById/:id",isAuth, bookController.updateBookById);
router.post("/addBook",isAuth, bookController.create);
router.delete("/deleteById/:id", isAuth, bookController.deleteBookById);
module.exports = router;
