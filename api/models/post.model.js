//* IMPORTS
import mongoose from 'mongoose'; // Import de mongoose para crear el modelo de usuario

//* SCHEMA
// Definición del esquema de usuario
const postSchema = new mongoose.Schema({
        // Definición de los campos del esquema
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        image: {
            type: String,
            default: 'https://static.semrush.com/blog/uploads/media/17/48/17484f6f167c8596d4f7c97aa884172f/blog-post-templates.svg',
        },
        category: {
            type: String,
            default: 'uncategorized',
        },
        slug: {
            type: String,
            required: true,
            unique: true,

        }
    },
    { timestamps: true } // Se añade la opción de timestamps para crear los campos createdAt y updatedAt automáticamente
);

//* MODEL
// Creación del modelo de post a partir del esquema definido anteriormente
const Post = mongoose.model('Post', postSchema);

//* EXPORTS
// Exportación del modelo de usuario para poder utilizarlo en otras partes de la aplicación
export default Post;