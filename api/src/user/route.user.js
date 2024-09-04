const router = require("express").Router();
const middleWere = require("../../middelWere/middleWere")
const userController = require("./controller.user");
const { registrationSchema, loginSchema} = require("../validators/userValidation")
const validate = require("../../middelWere/validationMiddleware")


router.post("/registerUser",validate(registrationSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.userLogin);
// router.get("/users",userController.getUsers)
// router.delete("/delete/:id", userController.deleteUser)
// router.patch("/update/:id", userController.updateUser)
router.patch("/updatePassword/:id", middleWere, userController.updatepassword)

module.exports = router;
