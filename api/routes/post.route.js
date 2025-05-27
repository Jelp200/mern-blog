//* IMPORTS
import express from 'express';                              // Import de express
import { verifyToken } from '../utils/verifyUser.js';
import { create, getposts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);                // Ruta para crear un post, requiere verificación de token
router.get('/getposts', getposts);                          // Ruta para obtener un post, no requiere verificacion de token

// Exportar el enrutador para usarlo en otras partes de la aplicación
export default router;