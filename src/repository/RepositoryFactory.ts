import { Auto } from '../model/auto';
import { Persona } from '../model/persona';
import { IRepository } from './IRepository';
import AutoMemoryRepository from './memory/AutoMemoryRepository';
import PersonaMemoryRepository from './memory/PersonaMemoryRepository';
import PersonaMongoRepository from './mongodb/PersonaMongoRepository';
import AutoMongoRepository from './mongodb/AutoMongoRepository';

let personaRepositorySingletonInstance: IRepository<Persona> | undefined = undefined;
let autoRepositorySingletonInstance: IRepository<Auto> | undefined = undefined;

const RepositoryFactory = {
    personaRepository(): IRepository<Persona> {
        if (personaRepositorySingletonInstance === undefined) {
            personaRepositorySingletonInstance = this.getPersonaRepositoryByConfiguration();
        }
        return personaRepositorySingletonInstance;
    },

    autoRepository(): IRepository<Auto> {
        if (autoRepositorySingletonInstance === undefined) {
            autoRepositorySingletonInstance = this.getAutoRepositoryByConfiguration();
        }
        return autoRepositorySingletonInstance;
    },

    getPersonaRepositoryByConfiguration(): IRepository<Persona> {
        if (process.env.REPOSITORY === 'Memory') {
            return PersonaMemoryRepository;
        }
        if (process.env.REPOSITORY === 'Mongodb') {
            return PersonaMongoRepository;
        }
        return PersonaMemoryRepository;
    },

    getAutoRepositoryByConfiguration(): IRepository<Auto> {
        if (process.env.REPOSITORY === 'Memory') {
            return AutoMemoryRepository;
        }
        if (process.env.REPOSITORY === 'Mongodb') {
            return AutoMongoRepository;
        }
        return AutoMemoryRepository;
    }
};

export default RepositoryFactory;
