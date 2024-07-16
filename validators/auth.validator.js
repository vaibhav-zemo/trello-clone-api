const Joi = require('joi');

const registerValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    profileBg: Joi.string(),
});

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

module.exports = { registerValidator, loginValidator };