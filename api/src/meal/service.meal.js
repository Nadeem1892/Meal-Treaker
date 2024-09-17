const Meal = require("./model.meal")
const moment = require('moment');
const mealService = {}


//Add Meals
mealService.addMeal = async ({meal_name, calories, protein, carbs, fat, type, userId}) => {
return await Meal.create({meal_name, calories, protein, carbs, fat, type, userId})
}

//get all meals
mealService.getMeals = async (userId, date) => {
return await Meal.find({userId,date})
}



// Get meals based on the specified period (week/month/total)
mealService.getMealsByPeriod = async (userId, startDate, endDate) => {
    try {
    
      // Fetch meals based on date range
      return  await Meal.find({
        userId,
        date: {
            $gte: moment(startDate).format('DD-MM-YYYY'),
            $lte: moment(endDate).format('DD-MM-YYYY')
        },
      });
  
    } catch (error) {
      throw new Error('Error fetching meals by period');
    }
  };

module.exports = mealService