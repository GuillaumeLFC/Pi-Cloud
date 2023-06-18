import { MongoClient, Db, Collection } from "mongodb";
import { Photo } from "../../utils/photos";
import { client } from "./connection";

const db : Db = client.db("photos");

async function createCollection(collectionName : string) {
    const jsonSchema = {
        required: ["_id", "path"],
        properties: {
            _id : {bsonType : "string"},
            path : {bsonType : "string"}
        }
        }
    await db.createCollection(collectionName, {
        validator : { $jsonSchema : jsonSchema}
    })
}

async function collectionExist(collectionName : string) : Promise<boolean> {
    const collections = await db.listCollections().toArray();
    const collectionExist : boolean = collections.some(collection => collection.name === collectionName);
    return collectionExist;
};

if (!collectionExist('photos')) {
    createCollection('photos');
}
const collection = db.collection('photos');

export async function insertmongo(photo : Photo) {
    const document = {
        id : photo.id,
        path : photo.path,
        filextension : photo.filextension,
        DateAndTimeISO : photo.DateAndTimeISO,
        metadata : photo.metadata,
    }
}