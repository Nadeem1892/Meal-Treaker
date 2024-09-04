const planController = require("./controller.mealPlan")
const router = require("express").Router()
const middleWere = require("../../middelWere/middleWere")
const {planValidationSchema} = require("../validators/planValidation")
const validate = require("../../middelWere/validationMiddleware")


router.post("/add", middleWere, validate(planValidationSchema), planController.addPlan)
router.get("/get-plans", middleWere,planController.getPlan)

module.exports = router