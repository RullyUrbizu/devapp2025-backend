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
    autoRepository.create(auto);
};

const listar = (dni?: string): AutoDto[] => {
    let autosFiltrados = autoRepository.listar();

    if (dni) {
        autosFiltrados = autosFiltrados.filter((a: Auto) => a.duenio === dni);
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
    if (!auto) {
        return 'no se encontro el auto';
    }
    return auto;
};

const actualizar = (id: string, nuevoAuto?: Partial<Auto>) => {
    const auto = autoRepository.buscar(id);
    if (!auto) {
        console.log(auto);

        return 'no se encontro el auto';
    }

    const persona = personaRepository.buscarByDni(auto.duenio);
    if (!persona) {
        return 'no se encontro el dueño';
    }

    const autoActualizado = { ...auto, ...nuevoAuto };
    autoRepository.actualizar(autoActualizado);

    return autoActualizado;
};

const borrar = (id: string) => {
    return autoRepository.borrar(id);
};

export default { agregar, validarAuto, listar, buscar, borrar, actualizar };
