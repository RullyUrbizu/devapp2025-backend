import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error('Error:', err);

    if (err.name === 'NoExisteElElemento') {
        res.status(404).json('Elemento no encontrado');
    } else if (err.name === 'DatosInvalidos') {
        res.status(400).json(err.errors || { message: 'Datos invalidos' });
    } else if (err.name === 'PatenteEnUso') {
        res.status(400).json(err.errors || { message: 'Patente invalidas' });
    } else {
        res.status(500).json({ code: 500, message: err.message || 'Error interno del servidor' });
    }
};
