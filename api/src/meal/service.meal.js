const Meal = require("./model.meal")
const mealService = {}


//Add Meals
mealService.addMeal = async ({meal_name, calories, protein, carbs, fat, type, userId}) => {
return await Meal.create({meal_name, calories, protein, carbs, fat, type, userId})
}

//get all meals
mealService.getMeals = async (userId) => {
return await Meal.find({userId})
}

//get mealsbydate
// mealService.getMealsByDate = async (userId, startDate, endDate) => {
//     return await Meal.find({
//       userId,
//       date: {
//         $gte: startDate,
//         $lte: endDate
//       }
//     });
//   };


module.exports = mealService