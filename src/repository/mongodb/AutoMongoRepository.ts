import { Auto } from '../../model/auto';
import { IRepository } from '../IRepository';
import { Persona } from '../../model/persona';
import { getMongoCollection } from '../../DB/MongoClient';

const AutoMongoRepository: IRepository<Auto> = {
    async all(): Promise<Auto[]> {
        const collection = await getMongoCollection('personas');
        const personas = (await collection.find().toArray()) as Persona[];
        return personas.map((p) => p.autos || []).flat();
    },

    async get(id: string): Promise<Auto> {
        const collection = await getMongoCollection('personas');
        const persona = (await collection.findOne({ 'autos.id': id })) as Persona;
        if (!persona) {
            const error = new Error('Persona no encontrada');
            error.name = 'NoExisteElElemento';
            throw error;
        }

        const auto = persona.autos.find((a) => a.id === id);
        if (!auto) {
            const error = new Error(`Auto con patente ${id} no encontrado`);
            error.name = 'NoExisteElElemento';
            throw error;
        }

        return auto;
    },

    async save(entity: Auto): Promise<Auto> {
        const collection = await getMongoCollection('personas');
        const persona = (await collection.findOne({ id: entity.duenio })) as Persona;
        if (!persona) {
            const error = new Error(`Dueño con ID ${entity.duenio} no encontrado`);
            error.name = 'NoExisteElElemento';
            throw error;
        }

        const autos = persona.autos || [];
        const index = autos.findIndex((a) => a.id === entity.id);

        if (index !== -1) {
            autos[index] = entity;
        } else {
            autos.push(entity);
        }

        await collection.updateOne({ id: entity.duenio }, { $set: { autos } });
        return entity;
    },

    async delete(id: string): Promise<boolean> {
        const collection = await getMongoCollection('personas');
        const persona = (await collection.findOne({ 'autos.id': id })) as Persona;
        if (!persona) {
            return false;
        }

        const autosFiltrados = persona.autos.filter((a) => a.id !== id);
        const fueEliminado = autosFiltrados.length < persona.autos.length;

        if (fueEliminado) {
            await collection.updateOne({ id: persona.id }, { $set: { autos: autosFiltrados } });
        }

        return fueEliminado;
    }
};

export default AutoMongoRepository;
