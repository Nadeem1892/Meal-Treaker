const mealServices = require("./service.meal");
const moment = require('moment');
const mealController = {};

//Add Meal Controller
mealController.addMeal = async (req, res) => {
  try {
    const { meal_name, calories, protein, carbs, fat, type} = req.body;
    const newMeal = await mealServices.addMeal({
      meal_name,
      calories,
      protein,
      carbs,
      fat,
      type,
      userId: req?._id,
    });

    return res
      .status(201)
      .send({ status: "OK", message: "Meal Created Successfulluy", data: newMeal });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error adding meal", error });
  }
};

//get meals with date
mealController.getMeals = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req._id;

    const meals = await mealServices.getMeals(userId,date);
    
    if (!meals.length) {
     return res.send({ message: "Data not found", meals });
    }
    res.status(200).json({ message: "Meals retrieved successfully", meals });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving meals", error });
  }
};


mealController.getNutritionSummary = async (req, res) => {
  try {
  const userId = req._id;
  const { period } = req.query;

  let startDate, endDate;

  if (period === 'week') {
    startDate = moment().subtract(7, 'days').startOf('day').toDate();  // Last 7 days
    endDate = moment().endOf('day').toDate();  // Today
  } else if (period === 'month') {
    startDate = moment().subtract(1, 'month').startOf('month').toDate();  // Start of the last month
    endDate = moment().subtract(1, 'month').endOf('month').toDate();  // End of the last month
  } else {
    startDate = moment(0).startOf('day').toDate();  // Show all meals by default
    endDate = moment().endOf('day').toDate();  // Today
  }

  const meals = await mealServices.getMealsByPeriod(userId, startDate, endDate || 'total');
  // Aggregate total nutrition values
  const totalNutrition = meals.reduce(
    (acc, meal) => {
      acc.totalCalories += parseInt(meal.calories) || 0;
      acc.totalProtein += parseInt(meal.protein) || 0;
      acc.totalCarbs += parseInt(meal.carbs) || 0;
      acc.totalFat += parseInt(meal.fat) || 0;
      return acc;
    },
    { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
  );

  res.status(200).send({data:totalNutrition});

  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve meals', error });
  }
}



    

module.exports = mealController;
