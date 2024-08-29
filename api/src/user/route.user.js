const router = require("express").Router();
const middleWere = require("../../middelWere/middleWere")
const userController = require("./controller.user");

router.post("/registerUser", userController.registerUser);
router.post("/login", userController.userLogin);
router.get("/users",userController.getUsers)
router.delete("/delete/:id", userController.deleteUser)
router.patch("/update/:id", userController.updateUser)
router.patch("/updatePassword/:id", middleWere, userController.updatepassword)

module.exports = router;
