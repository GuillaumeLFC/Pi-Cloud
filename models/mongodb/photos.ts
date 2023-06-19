import { MongoClient, Db, Collection } from "mongodb";
import { Photo } from "../../utils/photos";
import { client } from "./connection";

const photosCollectionName = 'photos';
const db : Db = client.db("photos");

/**
 * Crée la collection avec le schema de validation et les indexes pour les photos.
 * @param collectionName 
 * @returns La collection créer.
 */
async function createCollection(collectionName : string) : Promise<Collection> {
    const jsonSchema = {
        required: ["_id", "path"],
        properties: {
            _id : {bsonType : "string"},
            path : {bsonType : "string"}
        }
        };
    const collection = await db.createCollection(collectionName, {
        validator : { $jsonSchema : jsonSchema}
    });
    return collection
};

/**
 * Vérifie si la collection entrée en paramètre existe dans la db.
 * @param collectionName 
 * @returns Boolean
 */
async function collectionExist(collectionName : string) : Promise<boolean> {
    const collections = await db.listCollections().toArray();
    const collectionExist : boolean = collections.some(collection => collection.name === collectionName);
    return collectionExist;
};

/**
 * Crée la collection si elle n'existe pas et return la collection dans tous les cas.
 * @param collectionName Le nom souhaité.
 * @returns 
 */
async function getCollection(collectionName:string) : Promise<Collection> {
    if (!collectionExist(collectionName)) {
        const collection = await createCollection(collectionName);
        return collection
    };
    const collection = db.collection(collectionName);
    return collection
};

export async function insertmongo(photo : Photo): Promise<void> {
    const collection = getCollection(photosCollectionName)
    const document = {
        id : photo.id,
        path : photo.path,
        filextension : photo.filextension,
        DateAndTimeISO : photo.DateAndTimeISO,
        metadata : photo.metadata,
    }
}