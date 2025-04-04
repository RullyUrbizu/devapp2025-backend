import { Auto } from '../model/auto';
import { Persona } from '../model/persona';
import personaRepository from './personaRepository';

const listar = () => {
    const autos: Auto[] = personaRepository
        .listar()
        .map((p: Persona) => p.autos)
        .flat();
    return autos;
};

const existe = (patente: string) => {
    return listar().some((a: Auto) => a.patente === patente);
};

const buscar = (patente: string) => {
    return listar().find((a: Auto) => a.patente === patente);
};
const borrar = (patente: string) => {
    return listar().filter((a: Auto) => a.patente === patente);
};

export default { existe, listar, buscar, borrar };
