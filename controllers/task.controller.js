const Task = require('../models/task.model');
const User = require('../models/user.model');
const Project = require('../models/project.model');
const { taskTransformer } = require('../transformers/task.transformer');
const { isValidForCreate, isValidForUpdate } = require('../validators/task.validator');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const customParseFormat = require('dayjs/plugin/customParseFormat');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat)

const create = async (req, res) => {
    try {
        const { error } = isValidForCreate.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const { name, description, dueDate, tags, projectId, assignedUsers } = req.body;

        for (let user of assignedUsers) {
            const userExists = await User.findById(user);
            if (!userExists) {
                return res.status(404).send({ message: 'User not found!' });
            }
        }

        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send({ message: 'Project not found!' });
        }

        const currentDate = dayjs().tz('Asia/Kolkata');
        const dueDateFormatted = dayjs(dueDate, 'DD/MM/YYYY').tz('Asia/Kolkata');
        if (dueDateFormatted.isBefore(currentDate)) {
            return res.status(400).send({ message: 'Due date cannot be in the past!' });
        }

        const task = new Task({ name, description, dueDate: dueDateFormatted, tags, project: projectId, assignedUsers });
        task.createdBy = res.locals.user._id;
        await task.save();

        project.tasks.push(task._id);
        await project.save();

        return res.status(201).send({ message: 'Task created successfully!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { error } = isValidForUpdate.validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.message });
        }

        const { name, description, tags, assignedUsers, status } = req.body;

        if (assignedUsers) {
            for (let user of assignedUsers) {
                const userExists = await User.findById(user);
                if (!userExists) {
                    return res.status(404).send({ message: 'User not found!' });
                }
            }
        }

        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { name, description, tags, assignedUsers, status },
            { new: true }
        );

        if (!task) {
            return res.status(404).send({ message: 'Task not found!' });
        }

        return res.status(200).send({ message: 'Task updated successfully!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send({ message: 'Task not found!' });
        }

        if (task.createdBy.toString() !== res.locals.user._id.toString()) {
            return res.status(403).send({ message: 'You are not authorized to delete this task!' });
        }

        const project = await Project.findById(task.project);
        if (!project) {
            return res.status(404).send({ message: 'Project not found!' });
        }

        project.tasks.pull(task._id);
        await project.save();

        await task.remove;
        return res.status(200).send({ message: 'Task deleted successfully!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const show = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assignedUsers');
        if (!task) {
            return res.status(404).send({ message: 'Task not found!' });
        }

        return res.status(200).send(taskTransformer.transform(task));
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

module.exports = { create, update, remove, show };