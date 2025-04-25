import { Auto } from '../model/auto';
import { AutoDto } from '../dto/autoDto';
import autoRepository from '../repository/autoRepository';
import personaRepository from '../repository/personaRepository';
import { v4 as uuidv4 } from 'uuid';

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

//add
const agregar = (auto: Auto) => {
    const id = uuidv4();
    auto.id = id;
    if (validarAuto(auto)) {
        throw new Error('Datos invalidos');
    }
    if (personaRepository.existe(auto.patente)) {
        throw new Error(`La patente ${auto.patente} ya esta en uso`);
    }
    const duenioExiste = personaRepository.buscar(auto.duenio);
    if (!duenioExiste) {
        throw new Error(`El dueño con DNI ${auto.duenio} no existe`);
    }
    autoRepository.create(auto);
};

const listar = (id?: string): AutoDto[] => {
    let autosFiltrados = autoRepository.listar();

    if (id) {
        autosFiltrados = autosFiltrados.filter((a: Auto) => a.duenio === id);
    }
    const autosDto: AutoDto[] = autosFiltrados.map((auto: Auto) => ({
        id: auto.id,
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente
    }));
    return autosDto;
};

const buscar = (id: string) => {
    const auto = autoRepository.buscar(id);
    return auto;
};

const actualizar = (id: string, nuevoAuto?: Partial<Auto>) => {
    const auto = autoRepository.buscar(id);
    if (!auto) {
        throw new Error('Auto no encontrado');
    }

    const persona = personaRepository.buscar(auto.duenio);
    if (!persona) {
        throw new Error('Dueño no encontrado');
    }

    const autoActualizado = { ...auto, ...nuevoAuto };
    autoRepository.actualizar(autoActualizado);

    return autoActualizado;
};

const borrar = (id: string) => {
    return autoRepository.borrar(id);
};

export default { agregar, validarAuto, listar, buscar, borrar, actualizar };
