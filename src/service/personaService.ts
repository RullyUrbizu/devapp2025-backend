import { Persona } from '../model/persona';
import { PersonaDto } from '../dto/personaDto';
import personaRepository from '../repository/personaRepository';
import autoService from '../service/autoService';
import { Auto } from '../model/auto';
import { v4 as uuidv4 } from 'uuid';

const validarPersona = (persona: Persona) => {
    return (
        typeof persona.nombre !== 'string' ||
        typeof persona.apellido !== 'string' ||
        typeof persona.dni !== 'string' ||
        typeof persona.esDonante !== 'boolean' ||
        !['Masculino', 'Femenino', 'No-Binario'].includes(persona.genero)
    );
};

//add
const agregar = (persona: Persona) => {
    const id = uuidv4();
    persona.id = id;
    if (validarPersona(persona)) {
        throw new Error('Datos invalidos');
    }
    if (personaRepository.existe(persona.dni)) {
        throw new Error(`Persona con DNI ${persona.dni} ya existe`);
    }
    const autosInvalidos = persona.autos.filter((a: Auto) => autoService.validarAuto(a));
    if (autosInvalidos.length > 0) {
        throw new Error('Algún auto es invalido');
    }
    personaRepository.create(persona);
};

//browse
const listar = (): PersonaDto[] => {
    return personaRepository.listar().map(({ id, nombre, apellido, dni }) => ({
        id,
        nombre,
        apellido,
        dni
    }));
};

//read
const buscar = (dni: string) => {
    return personaRepository.buscar(dni);
};

// Edit
const editar = (dni: string, nuevosDatos?: JSON) => {
    const persona = personaRepository.buscar(dni);
    if (!persona) {
        return 'ninguna persona con ese dni';
    }
    const nuevaPersona = { ...persona, ...nuevosDatos };
    personaRepository.actualizar(nuevaPersona);
    return 'Se actualizo correctamente';
};

//delete
const borrar = (dni: string) => {
    const persona = personaRepository.buscar(dni);
    if (!persona) {
        return 'no se pudo eliminar';
    }
    return personaRepository.borrar(dni);
};

export default { agregar, listar, buscar, borrar, editar };
