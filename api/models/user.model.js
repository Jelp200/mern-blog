//* IMPORTS
import mongoose from 'mongoose'; // Import de mongoose para crear el modelo de usuario

//* SCHEMA
// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
        // Definición de los campos del esquema
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        // Se añade la opción de timestamps para crear los campos createdAt y updatedAt automáticamente
    }, { timestamps: true }
);

//* MODEL
// Creación del modelo de usuario a partir del esquema definido anteriormente
const User = mongoose.model('User', userSchema);

//* EXPORTS
// Exportación del modelo de usuario para poder utilizarlo en otras partes de la aplicación
export default User;