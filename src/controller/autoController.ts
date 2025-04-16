import { Request, Response } from 'express';
import autoService from '../service/autoService';
// import { Auto } from '../model/auto;

// Browse
const listar = (req: Request, res: Response) => {
    const dni = req.query.dni as string | undefined;
    const autos = autoService.listar(dni);
    res.status(200).json(autos);
};

// Read
const buscar = (req: Request, res: Response) => {
    const patente = req.params.patente;
    const auto = autoService.buscar(patente);
    if (!auto) {
        res.status(404).json('Auto no encontrao').send();
    }
    res.status(200).json(auto).send();
};

const actualizar = (req: Request, res: Response) => {
    const patente = req.params.patente;
    const auto = autoService.actualizar(patente, req.body);
    if (!auto) {
        res.status(404).json('Auto no encontrao').send();
    }
    res.status(200).json(auto).send();
};

// Delete
const borrar = (req: Request, res: Response) => {
    const patente = req.params.patente;
    const eliminado = autoService.borrar(patente);

    if (!eliminado) {
        res.status(404).json('Auto no encontrado').send();
    }

    res.status(200).json('Auto eliminado correctamente');
};

export default { buscar, listar, actualizar, borrar };
