import { Persona } from './persona';
export interface Auto {
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    numeroChasis: string;
    numeroMotor: string;
    duenio: Persona;
}
