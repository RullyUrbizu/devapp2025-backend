// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import personaController from '../controller/personaController';
import autoService from '../service/autoService';

import { Persona } from '../model/persona';
import { Auto } from '../model/auto';

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

app.get('/autos', autoService.listar);

// Read
app.get('/persona/:dni', personaController.buscar);

app.get('/auto/:patente', autoService.buscar);

// Edit
app.put('/persona/:dni', (req, res) => {
    const dni = req.params.dni;
    const persona = personas.find((persona: Persona) => persona.dni === dni);

    if (!persona) {
        res.send(404).json({ message: 'Persona no encontrada' });
    }
    const nuevaPersona = { ...persona, ...req.body };
    res.status(201).json(nuevaPersona);
});

app.put('/auto/:patente', (req, res) => {
    const patente = req.params.patente;
    const auto = autos.find((auto: Auto) => auto.patente === patente);
    if (!auto) {
        res.send(404).json({ message: 'Auto no encontrada' });
    }
    const nuevoAuto = { ...auto, ...req.body };
    res.status(201).json(nuevoAuto);
});

// Delete
app.delete('/persona/:dni', personaController.borrar);

app.delete('/auto/:patente', autoService.borrar);

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// por ahora guardo las personas en esta lista, hasta que conectemos la bdd
const personas: Persona[] = [];
const autos: Auto[] = [];
