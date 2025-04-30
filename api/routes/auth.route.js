//* IMPORTS
import express from 'express';                              // Import de express
import { signup } from '../controllers/auth.controller.js'; // Import de la función signup del controlador de autenticación
import { signin } from '../controllers/auth.controller.js'; // Import de la función signin del controlador de autenticación

// Crear un enrutador de Express
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

// Exportar el enrutador para usarlo en otras partes de la aplicación
export default router;