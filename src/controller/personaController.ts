import { Request, Response } from 'express';
import personaService from '../service/personaService';
import { Persona } from '../model/persona';

// Add
const agregar = (req: Request, res: Response) => {
    const persona: Persona = req.body;
    const error = personaService.agregar(persona);

    if (error) {
        res.status(400).json({ mensaje: error }).send();
    }
    res.status(201).json('Se agregó la persona correctamente').send();
};

// Browse
const listar = (req: Request, res: Response) => {
    const personas = personaService.listar();
    res.status(200).json(personas);
};

// Read
const buscar = (req: Request, res: Response) => {
    const persona = personaService.buscar(req.params.dni);

    if (!persona) {
        res.status(404).json('Persona no encontrada').send();
    }

    res.status(200).json(persona);
};

// Delete
const borrar = (req: Request, res: Response) => {
    const dni = req.params.dni;
    const eliminado = personaService.borrar(dni);

    if (eliminado) {
        res.status(404).json('Persona no encontrada').send();
    }

    res.status(200).json('Persona eliminada correctamente');
};

export default { agregar, listar, buscar, borrar };
