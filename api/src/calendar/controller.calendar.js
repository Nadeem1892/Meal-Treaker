const calendarService = require("./service.calendar")


const calendarController = {}

calendarController.getCalendarByDate = async (req,res) => {
try {
    const { date } = req.params;
    const calendar = await calendarService.getCalendarByDate(date)
 console.log(calendar)
    if (calendar === null) {
        return res.status(404).json({ message: 'No meals found for this date' });
      }

    res.status(200).json(calendar);
} catch (error) {
    res.status(500).json({ message: error.message });
}
}

module.exports = calendarController