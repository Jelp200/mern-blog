//* IMPORTS
import express from 'express';                              // Import de express
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create);

// Exportar el enrutador para usarlo en otras partes de la aplicación
export default router;