const Joi = require("joi")

const mealValidationSchema = Joi.object({
     
    meal_name:Joi.string().trim().required().messages({
        'string.empty': 'Meal name is required',
    }),
    calories: Joi.string().trim().required().messages({
        'string.empty': 'Calories are required',
      }),
      protein: Joi.string().trim().required().messages({
        'string.empty': 'Protein is required',
      }),
      carbs: Joi.string().trim().required().messages({
        'string.empty': 'Carbs are required',
      }),
      fat: Joi.string().trim().required().messages({
        'string.empty': 'Fat is required',
      }),
      type: Joi.string().valid('Breakfast', 'Lunch', 'Dinner').required().messages({
        'string.empty': 'Meal type is required',
        'any.only': 'Meal type must be one of: Breakfast, Lunch, Dinner',
      }),
      // date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required().messages({
      //   'string.empty': 'Date is required',
      //   'string.pattern.base': 'Date must be in DD-MM-YYYY format',
      // }),
})

module.exports = {
    mealValidationSchema
  };