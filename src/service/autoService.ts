import { Auto } from '../model/auto';
import { AutoDto } from '../dto/autoDto';
import AutoMemoryRepository from '../repository/memory/AutoMemoryRepository';
import PersonaMemoryRepository from '../repository/memory/PersonaMemoryRepository';
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

// add
const agregar = async (auto: Auto): Promise<void> => {
    const id = uuidv4();
    auto.id = id;

    if (validarAuto(auto)) {
        throw new Error('Datos inválidos');
    }

    const duenio = await PersonaMemoryRepository.get(auto.duenio);
    if (!duenio) {
        throw new Error('Dueño no existe');
    }

    const autos = await AutoMemoryRepository.all();
    const patenteEnUso = autos.some((a) => a.patente === auto.patente);
    if (patenteEnUso) {
        throw new Error(`La patente ${auto.patente} ya está en uso`);
    }

    await AutoMemoryRepository.save(auto);
};

const listar = async (id?: string): Promise<AutoDto[]> => {
    let autos = await AutoMemoryRepository.all();

    if (id) {
        autos = autos.filter((a) => a.duenio === id);
    }

    return autos.map((auto) => ({
        id: auto.id,
        marca: auto.marca,
        modelo: auto.modelo,
        anio: auto.anio,
        patente: auto.patente
    }));
};

const buscar = async (id: string): Promise<Auto> => {
    return await AutoMemoryRepository.get(id);
};

const actualizar = async (id: string, nuevoAuto?: Partial<Auto>): Promise<Auto> => {
    const auto = await AutoMemoryRepository.get(id);

    const persona = await PersonaMemoryRepository.get(auto.duenio);
    if (!persona) {
        throw new Error('Dueño no encontrado');
    }

    const autoActualizado = { ...auto, ...nuevoAuto, id };
    await AutoMemoryRepository.save(autoActualizado);

    return autoActualizado;
};

const borrar = async (id: string): Promise<boolean> => {
    return await AutoMemoryRepository.delete(id);
};

export default { agregar, validarAuto, listar, buscar, borrar, actualizar };
