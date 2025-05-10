import { MongoClient } from 'mongodb';
import { Persona } from '../model/persona';

const uri = process.env.bdd;
const nombreDeLaBDD = process.env.nombreBdd;

if (!uri || !nombreDeLaBDD) {
    throw new Error('Faltan variables de entorno para la conexion a MongoDB');
}

const cliente = new MongoClient(uri);
let hayConexion = false;

export async function getMongoCollection(collectionNombre: string) {
    if (!hayConexion) {
        try {
            await cliente.connect();
            hayConexion = true;
            console.log(`Conectado a MongoDB: ${nombreDeLaBDD}`);
        } catch (error) {
            console.error('Error conectando a MongoDB:', error);
            throw new Error('No se pudo conectar a la base de datos');
        }
    }
    const db = cliente.db(nombreDeLaBDD);
    return db.collection<Persona>(collectionNombre);
}
