import { Persona } from '../model/persona';
import { PersonaDto } from '../dto/personaDto';
import personaRepository from '../repository/personaRepository';
import autoService from '../service/autoService';
import { Auto } from '../model/auto';

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
    if (validarPersona(persona)) {
        return 'Datos inválidos';
    }
    if (personaRepository.existe(persona.dni)) {
        return `Persona con DNI ${persona.dni} ya existe`;
    }
    const autosInvalidos = persona.autos.filter((a: Auto) => autoService.validarAuto(a));
    if (autosInvalidos.length > 0) {
        return 'Algún auto es inválido';
    }
    personaRepository.create(persona);
};

//browse
const listar = (): PersonaDto[] => {
    return personaRepository.listar().map(({ nombre, apellido, dni }) => ({
        nombre,
        apellido,
        dni
    }));
};

//read
const buscar = (dni: string) => {
    return personaRepository.buscar(dni);
};

//delete
const borrar = (dni: string) => {
    const persona = personaRepository.buscar(dni);
    if (!persona) {
        return 'no se pudo eliminar';
    }
    return personaRepository.borrar(dni);
};

export default { agregar, listar, buscar, borrar };
