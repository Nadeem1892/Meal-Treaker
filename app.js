const express = require("express");
const app = express();
require("./dataBase");
const router = require("./api/route");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/", router);

module.exports = app;
