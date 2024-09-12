const Joi = require('joi');

// Common schema for fields used in both registration and login
const email = Joi.string()
  .trim()
  .pattern(new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
  .required()
  .messages({
    'string.pattern.base': 'Please enter a valid email address',
    'string.empty': 'Email is required',
  });

const password = Joi.string()
  .trim()
  .min(4)
  .required()
  .messages({
    'string.min': 'Password must be at least 4 characters long',
    'string.empty': 'Password is required',
  });

// Registration schema
const registrationSchema = Joi.object({
  name: Joi.string().trim().min(1).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 1 character long',
  }),
  email,
  gender: Joi.string()
    .valid('male', 'female', 'other')
    .required()
    .messages({
      'any.only': 'Gender must be either male, female, or other',
      'any.required': 'Gender is required',
    }),
  password,
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .optional()
    .messages({
      'any.only': 'Passwords do not match',
    }),
  age: Joi.number().integer().min(0).required().messages({
    'number.base': 'Age must be a number',
    'number.min': 'Age cannot be negative',
    'any.required': 'Age is required',
  }),
  weight: Joi.string().trim().required().messages({
    'string.empty': 'Weight is required',
  }),
  height: Joi.string().trim().required().messages({
    'string.empty': 'Height is required',
  }),
  
});

// Login schema
const loginSchema = Joi.object({
  email,
  password,
});

module.exports = {
  registrationSchema,
  loginSchema,
};
