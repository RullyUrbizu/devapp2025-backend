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
    const personas = personaRepository.listar();
    for (const persona of personas) {
        const tieneAuto = persona.autos.some((a: Auto) => a.patente === patente);
        if (tieneAuto) {
            persona.autos = persona.autos.filter((a) => a.patente !== patente);
            personaRepository.actualizar(persona);
            return true;
        }
    }
    return false;
};

const actualizar = (autoActualizado: Auto) => {
    const persona = personaRepository.buscar(autoActualizado.duenio);
    if (!persona) return;

    persona.autos = persona.autos.map((a) => (a.patente === autoActualizado.patente ? autoActualizado : a));

    personaRepository.actualizar(persona);
};

export default { existe, listar, buscar, borrar, actualizar };
