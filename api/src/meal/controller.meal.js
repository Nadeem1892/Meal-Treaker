const mealServices = require("./service.meal")

const mealController = {}

//Add Meal Controller
mealController.addMeal = async (req, res) => {
try {
    const { meal_name, calories, protein, carbs, fat, type, date } = req.body;
    const newMeal = await mealServices.addMeal({ meal_name, calories, protein, carbs, fat, type, date, userId:req?._id})
    return res.status(201).send({status:"OK", msg:"Meal Created Successfulluy", data:newMeal})
} catch (error) {
    console.log(err)
    return res.status(500).send({ message: "Error adding meal", err });
}
}

mealController.getMeals = async (req, res) => {
    try {
        const userId = req._id; 
        const meals = await mealServices.getMeals(userId)
        console.log(meals)
        res.status(200).json({ message: "Meals retrieved successfully", meals })
    } catch (error) {
        res.status(500).json({ message: "Error retrieving meals", error });
    }
}

module.exports = mealController