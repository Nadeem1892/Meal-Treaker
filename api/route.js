const userRoutes = require("./src/user/route.user");
const mealRoutes = require("./src/meal/route.meal")
const router = require("express").Router();

router.use("/user", userRoutes);
router.use("/meal", mealRoutes);


module.exports = router;
