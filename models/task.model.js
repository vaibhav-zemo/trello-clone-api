const mongoose = require('mongoose');
const { BACKLOG, IN_DISCUSSION, IN_PROGRESS, DONE } = require('../constants/taskStatus');

const taskSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    assignedUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: [BACKLOG, IN_DISCUSSION, IN_PROGRESS, DONE], default: 'backlog' },
    dueDate: { type: Date, require: true },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);