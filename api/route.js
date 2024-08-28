const userRoutes = require("./src/user/route.user");
const router = require("express").Router();

router.use("/user", userRoutes);

module.exports = router;
