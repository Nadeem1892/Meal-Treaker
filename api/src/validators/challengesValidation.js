const joi = require("joi")

const challengesValidationSchema = joi.object({

    startDate: joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required().messages({
        'string.empty': 'Date is required',
        'string.pattern.base': 'Start Date must be in DD-MM-YYYY format',
      }),
      endDate: joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required().messages({
        'string.empty': 'Date is required',
        'string.pattern.base': 'End Date must be in DD-MM-YYYY format',
      }),
      challengeName:joi.string().trim().required().messages({
        'string.empty': 'Challenges name is required',
    }),
    description:joi.string().trim().required().messages({
        'string.empty': 'Description required',
    }),
})

module.exports = {challengesValidationSchema}