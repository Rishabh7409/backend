const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
var travelRouter = require("./routes/index");
var app = express();
app.use(cors());
app.use(bodyparser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.use("/travel", travelRouter);

module.exports = { app };
