import { Persona } from '../model/persona';

let personas: Persona[] = [];

const listar = () => personas;

const existe = (dni: string) => {
    return personas.some((p) => p.dni === dni);
};

const create = (persona: Persona) => {
    personas.push(persona);
};

const buscar = (dni: string) => {
    return personas.find((p) => p.dni === dni);
};
const borrar = (dni: string) => {
    personas = personas.filter((p: Persona) => p.dni !== dni);
    return;
};

export default { existe, listar, create, buscar, borrar };
