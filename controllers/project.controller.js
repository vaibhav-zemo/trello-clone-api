const Project = require('../models/project.model');
const { isValidForCreate, isValidForUpdate } = require('../validators/project.validator');
const { projectListTransformer, projectDetailedTransformer } = require('../transformers/project.transformer');
const { populate } = require('../models/task.model');

const create = async (req, res) => {
    try {
        const { error } = isValidForCreate.validate(req.body);
        if (error) return res.status(400).send({ message: error.message });

        const { name, description, bgColor } = req.body;
        const project = new Project({ name, description, bgColor });
        project.createdBy = res.locals.user._id;
        await project.save();

        return res.status(201).send({ message: 'Project created successfully!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const list = async (req, res) => {
    try {
        const projects = await Project.find();
        return res.status(200).send(projectListTransformer.transform(projects));
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const show = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate({
            path: 'tasks',
            populate: { 
                path: 'assignedUsers', 
            }
        });
        if (!project) return res.status(404).send({ message: 'Project not found!' });
        
        return res.status(200).send(projectDetailedTransformer.transform(project));
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const update = async (req, res) => {
    try {
        const { error } = isValidForUpdate.validate(req.body);
        if (error) return res.status(400).send({ message: error.message });

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!project) return res.status(404).send({ message: 'Project not found!' });

        return res.status(200).send({ message: 'Project updated successfully!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

const remove = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).send({ message: 'Project not found!' });

        if (project.createdBy.toString() !== res.locals.user._id.toString()) {
            return res.status(403).send({ message: 'You are not authorized to delete this project!' });
        }

        await project.remove();
        return res.status(200).send({ message: 'Project deleted successfully!' });
    }
    catch (err) {
        return res.status(500).send({ message: err.message });
    }
}

module.exports = { create, list, show, update, remove };