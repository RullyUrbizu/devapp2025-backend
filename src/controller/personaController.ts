/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import personaService from '../service/personaService';
import { Persona } from '../model/persona';

// Add
const agregar = (req: Request, res: Response) => {
    try {
        const persona: Persona = req.body;
        personaService.agregar(persona);
        res.status(201).json('Se agregó la persona correctamente').send();
    } catch (err) {
        console.error(err);
        res.status(400).json(err).send();
    }
};

// Browse
const listar = (req: Request, res: Response) => {
    const personas = personaService.listar();
    res.status(200).json(personas);
};

// Read
const buscar = (req: Request, res: Response) => {
    const persona = personaService.buscar(req.params.id);
    if (!persona) {
        res.status(404).json('Persona no encontrada').send();
    }
    res.status(200).json(persona);
};

// Edit
const actualizar = (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const personaActualizada = personaService.editar(id, req.body);
        res.status(200).json(personaActualizada);
    } catch (err: any) {
        res.status(404).json({ mensaje: err.message });
    }
};

// Delete
const borrar = (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        personaService.borrar(id);
        res.status(200).json('Persona eliminada correctamente');
    } catch (err) {
        console.error(err);
        res.status(404).json(err).send();
    }
};

export default { agregar, listar, buscar, borrar, actualizar };
