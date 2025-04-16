import { Auto } from '../model/auto';
import { AutoDto } from '../dto/autoDto';
import autoRepository from '../repository/autoRepository';
import personaRepository from '../repository/personaRepository';

export const validarAuto = (auto: Auto) => {
    return (
        typeof auto.marca !== 'string' ||
        typeof auto.modelo !== 'string' ||
        typeof auto.anio !== 'number' ||
        typeof auto.patente !== 'string' ||
        typeof auto.color !== 'string' ||
        typeof auto.numeroChasis !== 'string' ||
        typeof auto.numeroMotor !== 'string' ||
        typeof auto.duenio !== 'string'
    );
};

const listar = (dni?: string): AutoDto[] => {
    let autosFiltrados = autoRepository.listar();

    if (dni) {
        autosFiltrados = autosFiltrados.filter((a: Auto) => a.duenio === dni);
    }
    const autosDto: AutoDto[] = autosFiltrados.map((auto: Auto) => ({
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente
    }));
    return autosDto;
};

const buscar = (patente: string) => {
    const auto = autoRepository.buscar(patente);
    if (!auto) {
        return 'no se encontro el auto';
    }
    return auto;
};

const actualizar = (patente: string, nuevoAuto?: JSON) => {
    const auto = autoRepository.buscar(patente);
    if (!auto) {
        return 'no se encontro el auto';
    }

    const persona = personaRepository.buscar(auto.duenio);
    if (!persona) {
        return 'no se encontro el dueño';
    }

    const autoActualizado = { ...auto, ...nuevoAuto };
    autoRepository.actualizar(autoActualizado);

    return autoActualizado;
};

const borrar = (patente: string) => {
    return autoRepository.borrar(patente);
};

export default { validarAuto, listar, buscar, borrar, actualizar };
