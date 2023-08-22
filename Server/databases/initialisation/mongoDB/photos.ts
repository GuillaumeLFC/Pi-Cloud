import { MongoClient, Db, Collection, InsertOneResult, ObjectId } from "mongodb";

export const photosCollectionName :string = 'photos';
let db : Db;

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
    return collection
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
        console.log('Les index "',index.name, '" ont bien été créer.');
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
    //console.log(`État collectionExist (${collectionName}) : ${collectionExist}`);
    return collectionExist;
};

/**
 * Vérifie que les différents trucs de mongoDB sont présent pour les photos
 * @param collectionName Le nom souhaité.
 * @returns 
 */
export async function checkAndValidateMongoPhotosRequirement(MongoDatabaseToCheck:Db) : Promise<void> {
    db = MongoDatabaseToCheck
    if (!await collectionExist(photosCollectionName)) { await createCollection(photosCollectionName); };
    const collection = db.collection(photosCollectionName);
    await checkAndCreateIndexes(collection);
    return
};
