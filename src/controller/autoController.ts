import { Request, Response } from 'express';
import autoService from '../service/autoService';
import { Auto } from '../model/auto';
import { error } from 'console';

const agregar = (req: Request, res: Response) => {
    const auto: Auto = req.body;
    autoService.agregar(auto);

    if (!error) {
        res.status(400).json({ mensaje: error }).send();
    }
    res.status(201).json('Se agrego el auto correctamente').send();
};

// Browse
const listar = (req: Request, res: Response) => {
    const dni = req.query.dni as string | undefined;
    const autos = autoService.listar(dni);
    res.status(200).json(autos);
};

// Read
const buscar = (req: Request, res: Response) => {
    const id = req.params.id;
    const auto = autoService.buscar(id);
    if (!auto) {
        res.status(404).json('Auto no encontrao').send();
    }
    res.status(200).json(auto).send();
};
// Edit
const actualizar = (req: Request, res: Response) => {
    const id = req.params.id;
    const auto = autoService.actualizar(id, req.body);
    if (!auto) {
        res.status(404).json('Auto no encontrao').send();
    }
    res.status(200).json(auto).send();
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
