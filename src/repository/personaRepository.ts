import { Persona } from '../model/persona';

let personas: Persona[] = [];

const listar = () => personas;

const existe = (dni: string) => {
    return personas.some((p) => p.dni === dni);
};

const create = (persona: Persona) => {
    personas.push(persona);
};

const buscar = (id: string) => {
    return personas.find((p) => p.id === id);
};
const borrar = (id: string) => {
    personas = personas.filter((p: Persona) => p.id !== id);
    return;
};
const actualizar = (persona: Persona) => {
    const ubicacion = personas.findIndex((p) => p.id === persona.id);
    if (ubicacion !== -1) {
        personas[ubicacion] = persona;
    }
};

export default { existe, listar, create, buscar, borrar, actualizar };
