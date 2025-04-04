import { Request, Response } from 'express';
import { Auto } from '../model/auto';
import { AutoDto } from '../dto/autoDto';
import autoRepository from '../repository/autoRepository';

export const validarAuto = (auto: Auto) => {
    return (
        typeof auto.marca !== 'string' ||
        typeof auto.modelo !== 'string' ||
        typeof auto.anio !== 'number' ||
        typeof auto.patente !== 'string' ||
        typeof auto.color !== 'string' ||
        typeof auto.numeroChasis !== 'string' ||
        typeof auto.numeroMotor !== 'string' ||
        typeof auto.duenio !== 'string'
    );
};

const listar = (req: Request, res: Response) => {
    const dni = req.query.dni as string | undefined;
    let autosFiltrados = autoRepository.listar();

    if (dni) {
        autosFiltrados = autosFiltrados.filter((a: Auto) => a.duenio === dni);
    }
    const autosDto: AutoDto[] = autosFiltrados.map((auto: Auto) => ({
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente
    }));
    res.status(200).json(autosDto).send();
};

const buscar = (req: Request, res: Response) => {
    const patente = req.params.patente;
    const auto = autoRepository.buscar(patente);
    if (!auto) {
        res.status(404).json('Auto no encontrado').send();
    }
    res.status(200).json(auto).send();
};

const borrar = (req: Request, res: Response) => {
    //no funciona bien
    const patente = req.params.patente;
    const auto = autoRepository.buscar(patente);
    if (!auto) {
        res.status(404).json('Auto no encontrado').send();
    }
    autoRepository.borrar(patente);
    res.status(200).json('se elimino correctamente').send();
};

export default { validarAuto, listar, buscar, borrar };
