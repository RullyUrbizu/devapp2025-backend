import { Auto, autoValidador } from './auto';
import { Genero } from './genero';
import { z } from 'zod';

export interface Persona {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: Date;
    genero: Genero;
    esDonante: string;
    autos: Auto[];
}

const personaValidador = z.object({
    id: z.string().uuid(),
    nombre: z.string(),
    apellido: z.string(),
    dni: z.string(),
    fechaNacimiento: z.coerce.date(),
    genero: z.nativeEnum(Genero),
    esDonante: z.boolean(),
    autos: z.array(autoValidador)
});

export const validarPersona = (persona: Persona): boolean => {
    const resultado = personaValidador.safeParse(persona);
    return !resultado.success;
};

export type PersonaParcial = Partial<Persona>;
