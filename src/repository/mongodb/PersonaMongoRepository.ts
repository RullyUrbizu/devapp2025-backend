import { getMongoCollection } from '../../DB/MongoClient';
import { Persona } from '../../model/persona';
import { IRepository } from '../IRepository';

const COLLECTION_NOMBRE = 'personas';

const PersonaMongoRepository: IRepository<Persona> = {
    async all(): Promise<Persona[]> {
        const collection = await getMongoCollection(COLLECTION_NOMBRE);
        return collection.find().toArray() as Promise<Persona[]>;
    },

    async get(id: string): Promise<Persona> {
        const collection = await getMongoCollection(COLLECTION_NOMBRE);
        const persona = await collection.findOne({ id });
        if (!persona) {
            const error = new Error(`Persona con ID ${id} no encontrada`);
            error.name = 'NoExisteElElemento';
            throw error;
        }
        return persona as Persona;
    },

    async save(persona: Persona): Promise<Persona> {
        const collection = await getMongoCollection(COLLECTION_NOMBRE);
        const existe = await collection.findOne({ id: persona.id });

        if (existe) {
            await collection.updateOne({ id: persona.id }, { $set: persona });
        } else {
            await collection.insertOne(persona);
        }

        return persona;
    },

    async delete(id: string): Promise<boolean> {
        const collection = await getMongoCollection(COLLECTION_NOMBRE);
        const result = await collection.deleteOne({ id });
        return result.deletedCount === 1;
    }
};

export default PersonaMongoRepository;
