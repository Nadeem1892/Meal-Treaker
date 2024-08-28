const router = require("express").Router();

const userController = require("./controller.user");

router.post("/registerUser", userController.registerUser);
router.post("/login", userController.userLogin);
router.get("/users",userController.getUsers)
router.delete("/delete/:id", userController.deleteUser)

module.exports = router;
