const Calendar = require("./model.calendar")

const calendarService = {}

calendarService.getCalendarByDate = async (date) => {
return await Calendar.findOne({date })
}

module.exports = calendarService