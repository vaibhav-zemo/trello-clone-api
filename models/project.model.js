const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}],
}, {timestamps: true});

module.exports = mongoose.model('Project', projectSchema);