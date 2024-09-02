const Meal = require("./model.meal")
const mealService = {}


//Add Meals
mealService.addMeal = async ({meal_name, calories, protein, carbs, fat, type, date, userId}) => {
return await Meal.create({meal_name, calories, protein, carbs, fat, type, date, userId})
}

//get all meals
mealService.getMeals = async (userId) => {
return await Meal.find({userId})
}


module.exports = mealService