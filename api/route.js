const userRoutes = require("./src/user/route.user");
const mealRoutes = require("./src/meal/route.meal")
const calendarRoutes = require("./src/calendar/route.calendar")
const router = require("express").Router();

router.use("/user", userRoutes);
router.use("/meal", mealRoutes);
router.use("/meals", calendarRoutes),

module.exports = router;
