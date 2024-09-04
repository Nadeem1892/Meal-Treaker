const mealServices = require("./service.meal");

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
      .send({ status: "OK", msg: "Meal Created Successfulluy", data: newMeal });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error adding meal", error });
  }
};

// get All meal by users
mealController.getMeals = async (req, res) => {
  try {
    const userId = req._id;
    const meals = await mealServices.getMeals(userId);
    if (!meals.length) {
     return res.send({ message: "Data not found", meals });
    }
    res.status(200).json({ message: "Meals retrieved successfully", meals });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving meals", error });
  }
};

//get meals with date

//  mealController.getMealsByDateRange = async (req, res) => {
//     try {
//         const { startDate, endDate } = req.params;
//         console.log('Start Date:', startDate, 'End Date:', endDate);
//         const userId = req._id; // Extracted from JWT token
    
//         // Fetch meals by date range
//         const meals = await mealServices.getMealsByDate(userId, startDate, endDate);
//       console.log(meals)
//         if (!meals.length) {
//           return res.status(200).send({ message: "Meals not found" });
//         }
    
//         return res.status(200).send({ message: "Meals retrieved successfully", meals });
//       } catch (error) {
//         res.status(500).json({ message: "Error retrieving meals", error });
//       }
//   };
  
  

module.exports = mealController;
