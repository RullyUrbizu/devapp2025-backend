import { Persona } from '../model/persona';
import { PersonaDto } from '../dto/personaDto';
import autoService from '../service/autoService';
import RepositoryFactory from '../repository/RepositoryFactory';
import { Auto } from '../model/auto';
import { v4 as uuidv4 } from 'uuid';

const personaRepo = RepositoryFactory.personaRepository();

const validarPersona = (persona: Persona) => {
    return (
        typeof persona.nombre !== 'string' ||
        typeof persona.apellido !== 'string' ||
        typeof persona.dni !== 'string' ||
        typeof persona.esDonante !== 'boolean' ||
        !['Masculino', 'Femenino', 'No-Binario'].includes(persona.genero)
    );
};

// add
const agregar = async (persona: Persona) => {
    persona.id = uuidv4();

    if (validarPersona(persona)) {
        throw Error('Datos invalidos');
    }
    const personas = await personaRepo.all();
    if (personas.some((p: Persona) => p.dni === persona.dni)) {
        throw Error(`Persona con DNI ${persona.dni} ya existe`);
    }
    const autosInvalidos = persona.autos.filter((a: Auto) => autoService.validarAuto(a));
    if (autosInvalidos.length > 0) {
        throw Error('Algun auto es invalido');
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
        throw Error('Error al eliminar la persona');
    }

    return true;
};

export default { agregar, listar, buscar, borrar, editar };
