const express = require("express");
const calendarController = require("./controller.calendar");
const router = express.Router();

router.get("/date/:date", calendarController.getCalendarByDate);

module.exports = router;