const router = require("express").Router()
const middleWere = require("../../middelWere/middleWere")
const {mealValidationSchema} = require("../validators/mealValidation")
const validate = require("../../middelWere/validationMiddleware")
const mealController = require("./controller.meal")

router.post("/add-meal",middleWere,validate(mealValidationSchema), mealController.addMeal)
router.get("/get-meals/:date",middleWere, mealController.getMeals)

// Route for fetching meals and nutrition summary with optional filters (week/month)
router.get('/nutrition-summary',middleWere, mealController.getNutritionSummary); 


module.exports = router