const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/TaskModel');

// Crear nueva tarea
router.post('/', async (req, res) => {
  try {
    console.log('📨 POST /tasks - Body recibido:', req.body);
    const {titleText, descText, dueDate, isCompleted, createdAt} = req.body;
    const newTask = new Task({
      titleText,
      descText,
      dueDate,
      isCompleted,
      createdAt,
    });
    await newTask.save();
    console.log('✅ Tarea creada:', newTask);
    res.status(201).json(newTask);
  } catch (error) {
    console.error('❌ Error en POST:', error.message);
    res.status(400).json({error: error.message});
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    console.log('📨 GET /tasks');
    const tasks = await Task.find();
    console.log('✅ Tareas obtenidas:', tasks.length);
    res.json(tasks);
  } catch (error) {
    console.error('❌ Error en GET:', error.message);
    res.status(500).json({error: error.message});
  }
});

// Obtener una tarea por ID
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    console.log('📨 GET /tasks/:id - ID:', id);
    const task = await Task.findById(id);
    if (!task) {
      console.log('❌ Tarea no encontrada');
      return res.status(404).json({error: 'Tarea no encontrada'});
    }
    console.log('✅ Tarea encontrada:', task);
    res.json(task);
  } catch (error) {
    console.error('❌ Error en GET /:id:', error.message);
    res.status(500).json({error: error.message});
  }
});

// Actualizar una tarea (PATCH)
router.patch('/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const {titleText, descText, dueDate, isCompleted} = req.body;

    console.log('📨 PATCH /tasks/:id - ID:', id);
    console.log('📝 Datos a actualizar:', {
      titleText,
      descText,
      dueDate,
      isCompleted,
    });

    // Validar que id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('❌ ID no válido:', id);
      return res.status(400).json({error: 'ID inválido'});
    }

    // Buscar la tarea por ID y actualizar solo los campos que vienen en el body
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {titleText, descText, dueDate, isCompleted},
      {new: true, runValidators: true},
    );

    if (!updatedTask) {
      console.log('❌ Tarea no encontrada para actualizar');
      return res.status(404).json({error: 'Tarea no encontrada'});
    }

    console.log('✅ Tarea actualizada:', updatedTask);
    res.status(200).json({
      success: true,
      message: 'Tarea actualizada correctamente',
      data: updatedTask,
    });
  } catch (error) {
    console.error('❌ Error en PATCH:', error.message);
    res.status(400).json({error: error.message});
  }
});

// Eliminar una tarea (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    console.log('📨 DELETE /tasks/:id - ID:', id);

    // Validar que id es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('❌ ID no válido:', id);
      return res.status(400).json({error: 'ID inválido'});
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      console.log('❌ Tarea no encontrada para eliminar');
      return res.status(404).json({error: 'Tarea no encontrada'});
    }

    console.log('✅ Tarea eliminada:', deletedTask);
    res.status(200).json({
      success: true,
      message: 'Tarea eliminada correctamente',
      data: deletedTask,
    });
  } catch (error) {
    console.error('❌ Error en DELETE:', error.message);
    res.status(400).json({error: error.message});
  }
});

module.exports = router;
