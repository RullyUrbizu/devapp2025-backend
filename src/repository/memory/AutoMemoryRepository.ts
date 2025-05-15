import { Auto } from '../../model/auto';
import { IRepository } from '../IRepository';
import PersonaMemoryRepository from './PersonaMemoryRepository';
import { Persona } from '../../model/persona';

const AutoMemoryRepository: IRepository<Auto> = {
    async all(): Promise<Auto[]> {
        const personas: Persona[] = await PersonaMemoryRepository.all();
        const autos = personas.map((p) => p.autos || []).flat();
        return autos;
    },

    async get(id: string): Promise<Auto> {
        const autos = await this.all();
        const auto = autos.find((a: Auto) => a.id === id);
        if (!auto) {
            const error = new Error(`Auto con id ${id} no encontrado`);
            error.name = 'NoExisteElElemento';
            throw error;
        }
        return auto;
    },

    async save(entity: Auto): Promise<Auto> {
        const persona = await PersonaMemoryRepository.get(entity.duenio);
        const index = persona.autos.findIndex((a) => a.id === entity.id);

        if (index !== -1) {
            persona.autos[index] = entity;
        } else {
            persona.autos.push(entity);
        }

        await PersonaMemoryRepository.save(persona);
        return entity;
    },

    async delete(id: string): Promise<boolean> {
        const personas = await PersonaMemoryRepository.all();

        for (const persona of personas) {
            const originalLength = persona.autos.length;
            persona.autos = persona.autos.filter((a) => a.id !== id);

            if (persona.autos.length < originalLength) {
                await PersonaMemoryRepository.save(persona);
                return true;
            }
        }

        return false;
    }
};

export default AutoMemoryRepository;
