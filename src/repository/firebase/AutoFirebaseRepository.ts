import { IRepository } from '../IRepository';
import { Auto } from '../../model/auto';
import { db } from '../../server/fireBase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Persona } from '../../model/persona';
import PersonaFirebaseRepository from './PersonaFirebaseRepository';

const COLLECTION_PERSONAS = 'Users';

const AutoFirebaseRepository: IRepository<Auto> = {
    async all(): Promise<Auto[]> {
        const personas: Persona[] = await PersonaFirebaseRepository.all();
        const autos = personas.map((p) => p.autos || []).flat();
        return autos;
    },
    async get(id: string): Promise<Auto> {
        const autos = await this.all();
        const autoBuscado = autos.find((e: Auto) => e.id === id);
        if (!autoBuscado) {
            const error = new Error(`Auto con patente ${id} no encontrado`);
            error.name = 'NoExisteElElemento';
            throw error;
        }
        return autoBuscado;
    },
    async save(entity: Auto): Promise<Auto> {
        const personaRef = doc(db, COLLECTION_PERSONAS, entity.duenio);
        const personaSnap = await getDoc(personaRef);

        if (!personaSnap.exists()) {
            const error = new Error(`Duenio con ID ${entity.duenio} no encontrado`);
            error.name = 'NoExisteElElemento';
            throw error;
        }

        const personaData = personaSnap.data();
        const autos: Auto[] = personaData.autos;

        const index = autos.findIndex((a) => a.id === entity.id);

        if (index !== -1) {
            autos[index] = entity;
        } else {
            autos.push(entity);
        }
        await updateDoc(personaRef, { autos });

        return entity;
    },
    async delete(id: string): Promise<boolean> {
        const auto: Auto = await this.get(id);
        const persona = await PersonaFirebaseRepository.get(auto.duenio);
        if (auto && persona) {
            const autosNuevos = persona.autos?.filter((a) => a.id !== id);
            persona.autos = autosNuevos;
            await PersonaFirebaseRepository.save(persona);
            return true;
        }
        return false;
    }
};

export default AutoFirebaseRepository;
