import { NextFunction, Request, Response } from 'express';
import autoService from '../service/autoService';
import { Auto } from '../model/auto';

const agregar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const auto: Auto = req.body;
        await autoService.agregar(auto);
        res.status(201).json('Se agrego el auto correctamente');
    } catch (err) {
        next(err);
    }
};

// Browse
const listar = async (req: Request, res: Response) => {
    const id = req.query.id as string | undefined;
    const autos = await autoService.listar(id);
    res.status(200).json(autos);
};

// Read
const buscar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const auto = await autoService.buscar(id);

        if (!auto) {
            const error = new Error('Auto no encontrado');
            error.name = 'NoExisteElElemento';
            throw error;
        }

        res.status(200).json(auto);
    } catch (err) {
        next(err);
    }
};

// Edit
const actualizar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const auto = await autoService.actualizar(id, req.body);
        res.status(200).json(auto).send();
    } catch (err) {
        next(err);
    }
};

// Delete
const borrar = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;
        const eliminado = await autoService.borrar(id);

        if (!eliminado) {
            const error = new Error('Auto no encontrado');
            error.name = 'NoExisteElElemento';
            throw error;
        }

        res.status(200).json({ message: 'Auto eliminado correctamente' });
    } catch (err) {
        next(err);
    }
};

export default { agregar, buscar, listar, actualizar, borrar };
