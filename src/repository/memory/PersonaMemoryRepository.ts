import { Persona } from '../../model/persona';
import { IRepository } from '../IRepository';

let personas: Persona[] = [];

const PersonaMemoryRepository: IRepository<Persona> = {
    async all(): Promise<Persona[]> {
        return personas;
    },

    async get(id: string): Promise<Persona> {
        const persona = personas.find((p) => p.id === id);
        if (!persona) {
            throw Error(`Persona con ID ${id} no encontrada`);
        }
        return persona;
    },

    async save(entity: Persona): Promise<Persona> {
        const index = personas.findIndex((p) => p.id === entity.id);
        if (index !== -1) {
            personas[index] = entity;
        } else {
            console.log('se guarda la persona');

            personas.push(entity);
        }
        return entity;
    },

    async delete(id: string): Promise<boolean> {
        const tamanioAntes = personas.length;
        personas = personas.filter((p) => p.id !== id);
        return personas.length < tamanioAntes;
    }
};

export default PersonaMemoryRepository;
