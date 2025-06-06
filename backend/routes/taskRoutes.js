// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/TaskModel');

// Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    const { titleText, descText, dueDate } = req.body;
    const newTask = new Task({ titleText, descText, dueDate });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
