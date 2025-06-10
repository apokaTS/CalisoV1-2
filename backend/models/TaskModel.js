// models/TaskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titleText: String,
  descText: String,
  dueDate: Date,
  isCompleted: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
