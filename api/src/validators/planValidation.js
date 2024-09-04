const joi = require("joi")

const planValidationSchema = joi.object({

    startDate: joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required().messages({
        'string.empty': 'Date is required',
        'string.pattern.base': 'Date must be in DD-MM-YYYY format',
      }),
      endDate: joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required().messages({
        'string.empty': 'Date is required',
        'string.pattern.base': 'Date must be in DD-MM-YYYY format',
      }),
      planName:joi.string().trim().required().messages({
        'string.empty': 'Plan Name name is required',
    }),
    description:joi.string().trim().required().messages({
        'string.empty': 'Description required',
    }),
})

module.exports = {planValidationSchema}