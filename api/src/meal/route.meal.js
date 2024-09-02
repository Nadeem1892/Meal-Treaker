const router = require("express").Router()
const middleWere = require("../../middelWere/middleWere")
const mealController = require("./controller.meal")

router.post("/add-meal",middleWere, mealController.addMeal)
router.get("/get-meals",middleWere, mealController.getMeals)


module.exports = router