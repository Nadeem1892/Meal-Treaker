const Joi = require("joi")

const mealValidationSchema = Joi.object({
     
    meal_name:Joi.string().trim().required().messages({
        'string.empty': 'Meal name is required',
    }),
    calories: Joi.number().min(0).required().messages({
        'number.base': 'Calories must be a number',
        'number.min': 'Calories cannot be negative',
        'any.required': 'Calories are required',
      }),
      protein: Joi.number().min(0).required().messages({
        'number.base': 'Protein must be a number',
        'number.min': 'Protein cannot be negative',
        'any.required': 'Protein is required',
      }),
      carbs: Joi.number().min(0).required().messages({
        'number.base': 'Carbs must be a number',
        'number.min': 'Carbs cannot be negative',
        'any.required': 'Carbs are required',
      }),
      fat: Joi.number().min(0).required().messages({
        'number.base': 'Fat must be a number',
        'number.min': 'Fat cannot be negative',
        'any.required': 'Fat is required',
      }),
      type: Joi.string().valid('Breakfast', 'Lunch', 'Dinner', 'Snack').required().messages({
        'string.empty': 'Meal type is required',
        'any.only': 'Meal type must be one of: Breakfast, Lunch, Dinner, Snack',
      }),
      date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required().messages({
        'string.empty': 'Date is required',
        'string.pattern.base': 'Date must be in DD-MM-YYYY format',
      }),
})

module.exports = {
    mealValidationSchema
  };