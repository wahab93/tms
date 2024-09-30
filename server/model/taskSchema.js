const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true, },
    taskEmail: { type: String, required: true, },
    isNew: { type: String }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;