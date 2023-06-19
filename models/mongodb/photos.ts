import { MongoClient, Db, Collection, InsertOneResult } from "mongodb";
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
    const collection : Collection = await db.createCollection(collectionName, {
        validator : { $jsonSchema : {
            required: ["_id", "path"],
            properties: {
                _id: { bsonType: "string" },
                path: { bsonType: "string" }
            }
        }}
    });
    return collection
};

async function checkAndCreateIndexes(collection : Collection) : Promise<void> {
    const indexesToCreate = [
        { name: 'DateAndTimeISO', key: { DateAndTimeISO: 1 } },
      ];

    const existingIndexes = await collection.indexes();
    const existingIndexNames = existingIndexes.map((index) => index.name);
    const missingIndexes = indexesToCreate.filter(
        (index) => !existingIndexNames.includes(index.name)
    );

    for (const index of missingIndexes) {
        await collection.createIndex(index.key, { name: index.name });
        console.log(index.name, 'créer !')
    }
};

/**
 * Vérifie si la collection entrée en paramètre existe dans la db.
 * @param collectionName 
 * @returns Boolean
 */
async function collectionExist(collectionName : string) : Promise<boolean> {
    const collections = await db.listCollections().toArray();
    const collectionExist : boolean = collections.some(collection => collection.name === collectionName);
    console.log('état collectionExist : ', collectionExist);
    return collectionExist;
};

/**
 * Crée la collection si elle n'existe pas et return la collection dans tous les cas.
 * @param collectionName Le nom souhaité.
 * @returns 
 */
async function getCollection(collectionName:string) : Promise<Collection> {
    if (! await collectionExist(collectionName)) {
        console.log('On execute le if');
        const collection = await createCollection(collectionName);
        await checkAndCreateIndexes(collection);
        return collection;
    };
    console.log('On execute pas le if');
    const collection = db.collection(collectionName);
    await checkAndCreateIndexes(collection);
    return collection
};

export async function insertmongo(photo : Photo): Promise<InsertOneResult> {
    const collection = await getCollection(photosCollectionName);
    const document = {
        id : photo.id,
        path : photo.path,
        filextension : photo.filextension,
        DateAndTimeISO : photo.DateAndTimeISO,
        metadata : photo.metadata,
    };
    const result = await collection.insertOne(document);
    return result;
};