const Joi = require('joi');

const isValidForCreate = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    bgColor: Joi.string()
});

const isValidForUpdate = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    bgColor: Joi.string()
}).min(1);

module.exports = { isValidForCreate, isValidForUpdate };