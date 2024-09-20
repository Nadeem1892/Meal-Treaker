const Joi = require("joi")

const categoryValidationSchema = Joi.object({
     
    categoryName:Joi.string().trim().required().messages({
        'string.empty': 'Category is required',
    }),
})

module.exports = {
    categoryValidationSchema
  };