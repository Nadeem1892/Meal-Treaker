const express = require("express");
const app = express();
const cors = require('cors')
require("./dataBase");
const router = require("./api/route");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use("/", router);
app.use(cors())

module.exports = app;
