const express = require("express");
var router = express.Router();

const book = require("./book");
const user = require("./user");
router.use(book);
router.use(user);

module.exports = router;
