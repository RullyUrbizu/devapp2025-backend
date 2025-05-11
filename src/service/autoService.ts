import { Auto, validarAuto } from '../model/auto';
import { AutoDto } from '../dto/autoDto';
import RepositoryFactory from '../repository/RepositoryFactory';
import { v4 as uuidv4 } from 'uuid';

// add
const agregar = async (auto: Auto): Promise<void> => {
    const id = uuidv4();
    auto.id = id;

    if (validarAuto(auto)) {
        throw new Error('Datos inválidos');
    }

    const duenio = await RepositoryFactory.personaRepository().get(auto.duenio);
    if (!duenio) {
        throw new Error('Dueño no existe');
    }

    const autos = await RepositoryFactory.autoRepository().all();
    const patenteEnUso = autos.some((a) => a.patente === auto.patente);
    if (patenteEnUso) {
        throw new Error(`La patente ${auto.patente} ya está en uso`);
    }

    await RepositoryFactory.autoRepository().save(auto);
};

const listar = async (id?: string): Promise<AutoDto[]> => {
    let autos = await RepositoryFactory.autoRepository().all();

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
    return await RepositoryFactory.autoRepository().get(id);
};

const actualizar = async (id: string, nuevoAuto?: Partial<Auto>): Promise<Auto> => {
    const auto = await RepositoryFactory.autoRepository().get(id);

    const persona = await RepositoryFactory.personaRepository().get(auto.duenio);
    if (!persona) {
        throw new Error('Dueño no encontrado');
    }

    const autoActualizado = { ...auto, ...nuevoAuto, id };
    await RepositoryFactory.autoRepository().save(autoActualizado);

    return autoActualizado;
};

const borrar = async (id: string): Promise<boolean> => {
    return await RepositoryFactory.autoRepository().delete(id);
};

export default { agregar, validarAuto, listar, buscar, borrar, actualizar };
