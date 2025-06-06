// server.js
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes'); // <--- Importamos rutas

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Funciona' });
});

// Usar las rutas para tareas
app.use('/tasks', taskRoutes); // <-- Montamos las rutas bajo /tasks

// Conexión a MongoDB y arranque del servidor
mongoose.connect('mongodb://127.0.0.1:27017/calisoDataBase')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(3000, () => console.log('Servidor iniciado en puerto 3000'));
  })
  .catch(err => console.error('Error al conectar MongoDB:', err));
