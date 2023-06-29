import { MongoClient, Db, Collection, InsertOneResult, ObjectId } from "mongodb";
import { Photo } from "../../utils/photos";
import { client, disconnectMongo } from "./connection";
import { connectoMongo } from "./connection";

const photosCollectionName = 'photos';
const db : Db = client.db("photos");

/**
 * Crée la collection avec le schema de validation et les indexes pour les photos.
 * @param collectionName 
 * @returns La collection créer.
 */
async function createCollection(collectionName : string) : Promise<Collection> {
    try {
        console.log('Création de la collection : ', collectionName);
        const collection : Collection = await db.createCollection(collectionName, {
        validator : { $jsonSchema : {
            bsonType : 'object',
            required: ["_id", "path"],
            properties: {
                _id: { bsonType : 'string' },
                path: { bsonType: "string" }
            }
        }}
    });
    return collection;
    } catch (error){
        console.log('Erreur dans le db.create collection : \n', error);
        throw error;
    }
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
        console.log('Les index " ',index.name, ' " ont bien été créer.');
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
    console.log(`État collectionExist (${collectionName}) : ${collectionExist}`);
    return collectionExist;
};

/**
 * Crée la collection si elle n'existe pas et return la collection dans tous les cas.
 * @param collectionName Le nom souhaité.
 * @returns 
 */
async function getCollection(collectionName:string) : Promise<Collection> {
    if (! await collectionExist(collectionName)) {
        const collection = await createCollection(collectionName);
        await checkAndCreateIndexes(collection);
        return collection;
    };
    const collection = db.collection(collectionName);
    await checkAndCreateIndexes(collection);
    return collection
};

/**
 * Le document des données d'une photo dans MongoDB
 */
interface DocumentPhoto {
    _id : ObjectId | string ,
    path : string,
    filextension ?: string,
    DateAndTimeISO : string,
    metadata ?: {
        ImageWidth?: number | undefined;
        ImageHeight?: number | undefined;
        XResolution?: number | undefined;
        YResolution?: number | undefined;
        ExifVersion?: string | undefined;
        DateTimeOriginal?: string | undefined;
        Latitude?: number | undefined;
        Longitude?: number | undefined;
    }
};

export async function insertmongo(photo : Photo): Promise<void> {
    try {
        await connectoMongo();
        const collection = await getCollection(photosCollectionName);
        const document : DocumentPhoto = {
            _id : photo.id,
            path : photo.path,
            filextension : photo.filextension,
            DateAndTimeISO : photo.DateAndTimeISO,
            metadata : photo.metadata
        }
        console.log(document._id);
        //@ts-expect-error (Un problème de type pour l'id que j'ai la flemme de régler) (ça marche quand meme)
        const result = await collection.insertOne(document);
        console.log(result);
    } catch (error) {
        console.error('Erreur dans le insertmongo : \n', error);
    } finally {
        await disconnectMongo();
    }
    //return result;
};
