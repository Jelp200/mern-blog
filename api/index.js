//* IMPORTACIONES
import express from 'express'; // Importamos express

// Creamos una instancia de express
const app = express();

//* INICIO DEL SERVIDOR
app.listen(3000, () => {
    // Callback para confirmar que el servidor está corriendo
    console.log('Servidor corriendo en el puerto 3000');
});