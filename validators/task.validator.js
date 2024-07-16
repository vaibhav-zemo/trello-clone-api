const Joi = require('joi').extend(require('@joi/date'));
Joi.objectId = require('joi-objectid')(Joi)
const { BACKLOG, IN_DISCUSSION, IN_PROGRESS, DONE } = require('../constants/taskStatus');

const isValidForCreate = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    assignedUser: Joi.objectId().required(),
    projectId: Joi.objectId().required(),
    dueDate: Joi.date().format('YYYY-MM-DD').required(),
    status: Joi.string().valid(BACKLOG, IN_DISCUSSION, IN_PROGRESS, DONE)
});

const isValidForUpdate = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    assignedUsers: Joi.array().items(Joi.objectId()),
    status: Joi.string().valid(BACKLOG, IN_DISCUSSION, IN_PROGRESS, DONE)
}).min(1);

module.exports = { isValidForCreate, isValidForUpdate };