// models/TaskModel.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  titleText: String,
  descText: String,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
