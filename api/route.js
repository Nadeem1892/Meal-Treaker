const userRoutes = require("./src/user/route.user");
const mealRoutes = require("./src/meal/route.meal")
const planRoutes = require("./src/meal planner/route.mealPlan")
const challengesRoutes = require("./src/challenges/route.challenges")
const router = require("express").Router();

router.use("/user", userRoutes);
router.use("/meal", mealRoutes);
router.use("/plans", planRoutes);
router.use("/challenges", challengesRoutes)


module.exports = router;
