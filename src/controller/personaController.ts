import { NextFunction, Request, Response } from 'express';
import personaService from '../service/personaService';
import { Persona } from '../model/persona';

// Add
const agregar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const persona: Persona = req.body;
        await personaService.agregar(persona);
        res.status(201).json('Se agregó la persona correctamente').send();
    } catch (err) {
        next(err);
    }
};

// Browse
const listar = async (req: Request, res: Response) => {
    const personas = await personaService.listar();
    res.status(200).json(personas);
};

// Read
const buscar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const persona = await personaService.buscar(req.params.id);
        res.status(200).json(persona);
    } catch (error) {
        next(error);
    }
};

// Edit
const actualizar = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        const personaActualizada = await personaService.editar(id, req.body);
        res.status(200).json(personaActualizada);
    } catch (err) {
        next(err);
    }
};

// Delete
const borrar = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        await personaService.borrar(id);
        res.status(200).json('Persona eliminada correctamente');
    } catch (err) {
        next(err);
    }
};

export default { agregar, listar, buscar, borrar, actualizar };
