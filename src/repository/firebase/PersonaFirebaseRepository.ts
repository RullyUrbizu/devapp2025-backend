import { IRepository } from '../IRepository';
import { Persona } from '../../model/persona';
import { db } from '../../server/fireBase';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

const COLLECTION_PERSONAS = 'Users';

const PersonaFirebaseRepository: IRepository<Persona> = {
    async all(): Promise<Persona[]> {
        const querySnapshot = await getDocs(collection(db, COLLECTION_PERSONAS));
        const personas: Persona[] = [];

        querySnapshot.forEach((element) => {
            const datos = element.data();
            personas.push({
                id: datos.id,
                nombre: datos.nombre,
                apellido: datos.apellido,
                dni: datos.dni,
                fechaNacimiento: datos.fechaNacimiento,
                genero: datos.genero,
                esDonante: datos.esDonante,
                autos: datos.autos
            });
        });
        return personas;
    },
    async get(id: string): Promise<Persona> {
        const docRef = doc(db, COLLECTION_PERSONAS, id);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
            const error = new Error('Persona no encontrada');
            error.name = 'NoExisteElElemento';
            throw error;
        }
        const datos = docSnap.data();
        const persona: Persona = {
            id: docSnap.id,
            nombre: datos.nombre,
            apellido: datos.apellido,
            dni: datos.dni,
            fechaNacimiento: datos.fechaNacimiento,
            genero: datos.genero,
            esDonante: datos.esDonante,
            autos: datos.autos
        };
        return persona;
    },
    async save(persona: Persona): Promise<Persona> {
        const personaRef = doc(db, COLLECTION_PERSONAS, persona.id);
        const existingDoc = await getDoc(personaRef);

        if (existingDoc.exists()) {
            await setDoc(personaRef, persona, { merge: true });
        } else {
            await setDoc(personaRef, persona);
        }
        return { ...persona };
    },
    async delete(id: string): Promise<boolean> {
        await deleteDoc(doc(db, COLLECTION_PERSONAS, id));
        return true;
    }
};

export default PersonaFirebaseRepository;
