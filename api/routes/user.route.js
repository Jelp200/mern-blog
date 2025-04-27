//* IMPORTS
import express from 'express';
import { test } from '../controllers/user.controller.js'; // Import de la función de prueba del controlador de usuario

// Crear un enrutador de Express
const router = express.Router();

router.get('/test', test);

// Exportar el enrutador para usarlo en otras partes de la aplicación
export default router;