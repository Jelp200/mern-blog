//* IMPORTACIONES
import express from 'express';                      // Import de express
import mongoose from 'mongoose';                    // Import de mongoose
import dotenv from 'dotenv';                        // Import de dotenv para manejar variables de entorno
import userRoutes from './routes/user.route.js';    // Import de las rutas de usuario
import authRoutes from './routes/auth.route.js';    // Import de las rutas de autenticación
import cookieParser from 'cookie-parser';

//* CONFIGURACIÓN DE VARIABLES DE ENTORNO
dotenv.config(); // Cargar las variables de entorno desde el archivo .env

mongoose
    .connect(process.env.MONGODB_URI) // Conexión a la base de datos MongoDB usando la URI almacenada en las variables de entorno
    .then(() => {
        // Callback para confirmar la conexión a la base de datos
        console.log('Conectado a MongoDB');
    })
    .catch((error) => {
        // Callback para manejar errores de conexión
        console.error('Error al conectar a MongoDB:', error);
    }
);

// Creamos una instancia de express
const app = express();

app.use(express.json()); // Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(cookieParser());

//* INICIO DEL SERVIDOR
app.listen(3000, () => {
    // Callback para confirmar que el servidor está corriendo
    console.log('Servidor corriendo en el puerto 3000');
    }
);

// Ruta de prueba para verificar que la API está funcionando correctamente
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; // Obtener el código de estado del error o usar 500 por defecto
    const message = err.message || 'Error interno del servidor'; // Obtener el mensaje de error o usar un mensaje por defecto
    res.status(statusCode).json({
        success: false, // Indicar que la respuesta no fue exitosa
        statusCode, // Incluir el código de estado en la respuesta
        message, // Incluir el mensaje de error en la respuesta
    });
});