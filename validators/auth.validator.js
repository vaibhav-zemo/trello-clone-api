const Joi = require('joi');

const registerValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
        .max(30)
        .pattern(/[a-z]/)  // At least one lowercase letter
        .pattern(/[A-Z]/)  // At least one uppercase letter
        .pattern(/\d/)  // At least one digit
        .pattern(/[!@#$%^&*()_+\-=[\]{};'"|,.<>/?]/)  // At least one special character
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should have a minimum length of {#limit}',
            'string.max': 'Password should have a maximum length of {#limit}',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
            'any.required': 'Password is required'
        }),
    profileBg: Joi.string(),
});

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8)
        .max(30)
        .pattern(/[a-z]/)  // At least one lowercase letter
        .pattern(/[A-Z]/)  // At least one uppercase letter
        .pattern(/\d/)  // At least one digit
        .pattern(/[!@#$%^&*()_+\-=[\]{};'"|,.<>/?]/)  // At least one special character
        .required()
        .messages({
            'string.base': 'Password should be a type of text',
            'string.empty': 'Password cannot be empty',
            'string.min': 'Password should have a minimum length of {#limit}',
            'string.max': 'Password should have a maximum length of {#limit}',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character',
            'any.required': 'Password is required'
        })
});

module.exports = { registerValidator, loginValidator };