import { z } from 'zod';
export interface Auto {
    id: string;
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    numeroChasis: string;
    numeroMotor: string;
    duenio: string;
}

export const autoValidador = z.object({
    marca: z.string(),
    modelo: z.string(),
    anio: z.number(),
    patente: z.string(),
    color: z.string(),
    numeroChasis: z.string(),
    numeroMotor: z.string(),
    duenio: z.string()
});

export const validarAuto = (auto: Auto): boolean => {
    const resultado = autoValidador.safeParse(auto);
    return !resultado.success;
};
