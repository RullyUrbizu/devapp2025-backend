import { Request, Response } from 'express';
import autoService from '../service/autoService';
import { Auto } from '../model/auto';

const agregar = (req: Request, res: Response) => {
    try {
        const auto: Auto = req.body;
        autoService.agregar(auto); // asumimos que lanza error si algo falla
        res.status(201).json('Se agregó el auto correctamente');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        res.status(400).json(err.message || 'Error al agregar el auto');
    }
};

// Browse
const listar = (req: Request, res: Response) => {
    const dni = req.query.dni as string | undefined;
    const autos = autoService.listar(dni);
    res.status(200).json(autos);
};

// Read
const buscar = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const auto = autoService.buscar(id);

        if (!auto) {
            res.status(404).json({ mensaje: 'Auto no encontrado' });
        }

        res.status(200).json(auto);
    } catch (err) {
        console.error('Error al buscar auto:', err);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

// Edit
const actualizar = (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const auto = autoService.actualizar(id, req.body);
        res.status(200).json(auto).send();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        if (err.message === 'Auto no encontrado') {
            res.status(404).json('Auto no encontrado');
        }
        if (err.message === 'Dueño no encontrado') {
            res.status(404).json('Dueño no encontrado');
        }
        console.error(err);
        res.status(500).json('Error interno del servidor');
    }
};

// Delete
const borrar = (req: Request, res: Response) => {
    const id = req.params.id;
    const eliminado = autoService.borrar(id);

    if (!eliminado) {
        res.status(404).json('Auto no encontrado').send();
    }

    res.status(200).json('Auto eliminado correctamente');
};

export default { agregar, buscar, listar, actualizar, borrar };
