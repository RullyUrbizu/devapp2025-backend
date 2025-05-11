import { Persona, validarPersona } from '../model/persona';
import { PersonaDto } from '../dto/personaDto';
import autoService from '../service/autoService';
import RepositoryFactory from '../repository/RepositoryFactory';
import { Auto } from '../model/auto';
import { v4 as uuidv4 } from 'uuid';

const personaRepo = RepositoryFactory.personaRepository();

// add
const agregar = async (persona: Persona) => {
    persona.id = uuidv4();

    if (validarPersona(persona)) {
        const error = new Error(`Datos invalidos`);
        error.name = 'DatosInvalidos';
        throw error;
    }
    const personas = await personaRepo.all();
    if (personas.some((p: Persona) => p.dni === persona.dni)) {
        const error = new Error(`DNI ${persona.dni} ya existe`);
        error.name = 'DatosInvalidos';
        throw error;
    }
    const autosInvalidos = persona.autos.filter((a: Auto) => autoService.validarAuto(a));
    if (autosInvalidos.length > 0) {
        const error = new Error('Auto invalido');
        error.name = 'DatosInvalidos';
        throw error;
    }
    await personaRepo.save(persona);
};

// browse
const listar = async (): Promise<PersonaDto[]> => {
    const personas = await personaRepo.all();
    const personasDto: PersonaDto[] = personas.map(({ id, nombre, apellido, dni }: PersonaDto) => ({
        id,
        nombre,
        apellido,
        dni
    }));
    return personasDto;
};

// read
const buscar = async (id: string): Promise<Persona> => {
    return await personaRepo.get(id);
};

// edit
const editar = async (id: string, nuevosDatos?: Partial<Persona>): Promise<Persona> => {
    const persona = await personaRepo.get(id);

    const nuevaPersona = { ...persona, ...nuevosDatos };
    await personaRepo.save(nuevaPersona);

    return nuevaPersona;
};

// delete
const borrar = async (id: string): Promise<boolean> => {
    await personaRepo.get(id);

    const eliminado = await personaRepo.delete(id);
    if (!eliminado) {
        const error = new Error(`Error al eliminar la persona con id ${id}`);
        error.name = 'ErrorEliminarPersoana';
        throw error;
    }

    return true;
};

export default { agregar, listar, buscar, borrar, editar };
