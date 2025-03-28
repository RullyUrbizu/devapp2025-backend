import { Auto } from './auto';
import { Genero } from './genero';

export interface Persona {
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: Date;
    genero: string;
    esDonante: Genero;
    autos?: Auto[];
}
