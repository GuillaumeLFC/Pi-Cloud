import { checkAndValidateMongoPhotosRequirement } from "./photos";
import { connectoMongo, disconnectfromMongo, defaultClient } from "../../connection/mongoDB";
import { Db, MongoClient } from "mongodb";

export const databaseName : string = "Pi-Cloud";
export var db : Db;

export async function initMongo(client ?: MongoClient){
    if (!client) {client = defaultClient;}

    await connectoMongo(client);
    db = client.db(databaseName);
    await checkAndValidateMongoPhotosRequirement(db);
    await disconnectfromMongo(client);
}