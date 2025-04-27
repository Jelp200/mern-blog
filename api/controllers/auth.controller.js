//* IMPORTS
import User from '../models/user.model.js'; // Import del modelo User para interactuar con la base de datos
import bcryptjs from 'bcryptjs'; // Import de bcrypt para el hash de contraseñas
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    // Desestructuración de los datos del cuerpo de la solicitud
    const { username, email, password } = req.body; // Extraemos username, email y password del cuerpo de la solicitud

    // Verificar que todos los campos requeridos están presentes
    if (
        !username ||
        !email ||
        !password ||
        username === '' ||
        email === '' ||
        password === ''
    ) {
        next(errorHandler(400, 'Todos los campos son obligatorios')); // Si falta algún campo, pasamos un error al siguiente middleware
    }

    // Hash de la contraseña usando bcryptjs
    // Se utiliza bcryptjs para crear un hash de la contraseña con un costo de 10 (rounds)
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Crear una nueva instancia del modelo User con los datos proporcionados
    const newUser = new User({
        username,
        email,
        password: hashedPassword, // Almacenar la contraseña hasheada en lugar de la contraseña en texto plano
    });

    try {
        // Guardar el nuevo usuario en la base de datos
        await newUser.save();
        // Responder con un mensaje de éxito
        res.json('Registro exitoso');
    } catch (error) {
        next(error); // Pasar el error al siguiente middleware de manejo de errores
    }
};