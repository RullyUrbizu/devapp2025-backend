import { Auto } from '../model/auto';
import { Persona } from '../model/persona';
import personaRepository from './personaRepository';

const create = (auto: Auto) => {
    const persona = personaRepository.buscar(auto.duenio);

    if (persona) {
        persona.autos.push(auto);
    }
};

const listar = () => {
    const autos: Auto[] = personaRepository
        .listar()
        .map((p: Persona) => p.autos)
        .flat();
    return autos;
};

const existe = (id: string) => {
    return listar().some((a: Auto) => a.id === id);
};

const buscar = (id: string) => {
    const auto = listar().find((a: Auto) => a.id === id);
    return auto;
};
const borrar = (id: string) => {
    const personas = personaRepository.listar();
    for (const persona of personas) {
        const tieneAuto = persona.autos.some((a: Auto) => a.id === id);
        if (tieneAuto) {
            persona.autos = persona.autos.filter((a) => a.id !== id);
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

export default { create, existe, listar, buscar, borrar, actualizar };
