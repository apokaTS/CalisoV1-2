// models/TaskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titleText: {
    type: String,
    required: true,
  },
  descText: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
