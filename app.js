const express = require("express");
const app = express();
var cors = require('cors')
require("./dataBase");
const router = require("./api/route");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors())
app.use("/", router);


module.exports = app;
