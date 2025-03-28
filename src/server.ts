// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import { Persona } from './model/persona';
import { PersonaDto } from './dto/personaDto';
import { Auto } from './model/auto';
import { AutoDto } from './dto/autoDto';

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
app.post('/persona', (req, res) => {
    const persona: Persona = req.body;
    personas.push(persona);
    res.json('se agrego la persona correctamente');
});

app.post('/auto', (req, res) => {
    const auto: Auto = req.body;
    autos.push(auto);
    res.json('se agrego el auto correctamente');
});

// Browse
app.get('/personas', (req, res) => {
    const personasSimples: PersonaDto[] = personas.map(({ nombre, apellido, dni }: Persona) => ({
        nombre,
        apellido,
        dni
    }));
    console.log(personas);
    res.json(personasSimples);
});

app.get('/autos', (req, res) => {
    // const unAuto = req.query.patente;
    // if (unAuto) {
    //     const auto = autos.find(auto => auto.patente === unAuto);
    //     if (auto) {
    //         // Si se encuentra el auto con la patente
    //         return res.json({
    //             marca: auto.marca,
    //             modelo: auto.modelo,
    //             anio: auto.anio,
    //             patente: auto.patente
    //         });
    //     } else {
    //         // Si no se encuentra el auto
    //         return res.status(404).json({ message: 'Auto no encontrado' });
    //     }
    // }

    const autosSimples: AutoDto[] = autos.map((auto: Auto) => ({
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente
    }));
    res.json(autosSimples);
});

// Read
app.get('/persona/:dni', (req, res) => {
    const dni = req.params.dni;
    const persona = personas.find((persona: Persona) => persona.dni === dni);
    if (persona) {
        res.status(200).json(persona);
    } else {
        res.status(404).json({ message: 'Persona no encontrada' });
    }
});

app.get('/auto/:patente', (req, res) => {
    const patente = req.params.patente;
    const auto = autos.find((auto: Auto) => auto.patente === patente);
    if (auto) {
        res.status(200).json(auto);
    } else {
        res.status(404).json('Auto no encontrada');
    }
});

// Edit
app.put('/persona/:dni', (req, res) => {
    const dni = req.params.dni;
    const persona = personas.find((persona: Persona) => persona.dni === dni);
    if (persona) {
        const { nombre, apellido, dni, fechaNacimiento, genero, esDonante } = req.body;
        persona.nombre = nombre;
        persona.apellido = apellido;
        persona.dni = dni;
        persona.fechaNacimiento = fechaNacimiento;
        persona.genero = genero;
        persona.esDonante = esDonante;
        res.status(201).json(persona);
    } else {
        res.status(404).json({ message: 'Persona no encontrada' });
    }
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// por ahora guardo las personas en esta lista, hasta que conectemos la bdd
const personas: Persona[] = [];
const autos: Auto[] = [];
