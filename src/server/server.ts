// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import autoController from '../controller/autoController';
import personaController from '../controller/personaController';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// sin esta linea no puedo trabajar con el body, a martin le quedaba undefined
// app.use(bodyParser.json());
app.use(express.json());

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

// Mis endpoints van acá
app.get('/', (req, res) => {
    res.json('hello world');
});

// Add
app.post('/persona', personaController.agregar);

// Browse
app.get('/personas', personaController.listar);

app.get('/autos', autoController.listar);

// Read
app.get('/persona/:dni', personaController.buscar);

app.get('/auto/:patente', autoController.buscar);

// Edit
app.put('/persona/:dni', personaController.actualizar);

app.put('/auto/:patente', autoController.actualizar);

// Delete
app.delete('/persona/:dni', personaController.borrar);

app.delete('/auto/:patente', autoController.borrar);

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
