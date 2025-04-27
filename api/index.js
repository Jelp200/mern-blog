//* IMPORTACIONES
import express from 'express';                      // Import de express
import mongoose from 'mongoose';                    // Import de mongoose
import dotenv from 'dotenv';                        // Import de dotenv para manejar variables de entorno
import userRoutes from './routes/user.route.js';    // Import de las rutas de usuario

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

//* INICIO DEL SERVIDOR
app.listen(3000, () => {
    // Callback para confirmar que el servidor está corriendo
    console.log('Servidor corriendo en el puerto 3000');
    }
);

// Ruta de prueba para verificar que la API está funcionando correctamente
app.use('/api/user', userRoutes);