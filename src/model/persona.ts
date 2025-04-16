import { Auto } from './auto';
import { Genero } from './genero';

export interface Persona {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: Date;
    genero: string;
    esDonante: Genero;
    autos: Auto[];
}

export type PersonaParcial = Partial<Persona>;
