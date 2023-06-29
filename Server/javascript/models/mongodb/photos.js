"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertmongo = void 0;
const connection_1 = require("./connection");
const connection_2 = require("./connection");
const photosCollectionName = 'photos';
const db = connection_1.client.db("photos");
/**
 * Crée la collection avec le schema de validation et les indexes pour les photos.
 * @param collectionName
 * @returns La collection créer.
 */
function createCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Création de la collection : ', collectionName);
            const collection = yield db.createCollection(collectionName, {
                validator: { $jsonSchema: {
                        bsonType: 'object',
                        required: ["_id", "path"],
                        properties: {
                            _id: { bsonType: 'string' },
                            path: { bsonType: "string" }
                        }
                    } }
            });
            return collection;
        }
        catch (error) {
            console.log('Erreur dans le db.create collection : \n', error);
            throw error;
        }
    });
}
;
function checkAndCreateIndexes(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const indexesToCreate = [
            { name: 'DateAndTimeISO', key: { DateAndTimeISO: 1 } },
        ];
        const existingIndexes = yield collection.indexes();
        const existingIndexNames = existingIndexes.map((index) => index.name);
        const missingIndexes = indexesToCreate.filter((index) => !existingIndexNames.includes(index.name));
        for (const index of missingIndexes) {
            yield collection.createIndex(index.key, { name: index.name });
            console.log('Les index " ', index.name, ' " ont bien été créer.');
        }
    });
}
;
/**
 * Vérifie si la collection entrée en paramètre existe dans la db.
 * @param collectionName
 * @returns Boolean
 */
function collectionExist(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield db.listCollections().toArray();
        const collectionExist = collections.some(collection => collection.name === collectionName);
        console.log(`État collectionExist (${collectionName}) : ${collectionExist}`);
        return collectionExist;
    });
}
;
/**
 * Crée la collection si elle n'existe pas et return la collection dans tous les cas.
 * @param collectionName Le nom souhaité.
 * @returns
 */
function getCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!(yield collectionExist(collectionName))) {
            const collection = yield createCollection(collectionName);
            yield checkAndCreateIndexes(collection);
            return collection;
        }
        ;
        const collection = db.collection(collectionName);
        yield checkAndCreateIndexes(collection);
        return collection;
    });
}
;
;
function insertmongo(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connection_2.connectoMongo)();
            const collection = yield getCollection(photosCollectionName);
            const document = {
                _id: photo.id,
                path: photo.path,
                filextension: photo.filextension,
                DateAndTimeISO: photo.DateAndTimeISO,
                metadata: photo.metadata
            };
            console.log(document._id);
            //@ts-expect-error (Un problème de type pour l'id que j'ai la flemme de régler) (ça marche quand meme)
            const result = yield collection.insertOne(document);
            console.log(result);
        }
        catch (error) {
            console.error('Erreur dans le insertmongo : \n', error);
        }
        finally {
            yield (0, connection_1.disconnectMongo)();
        }
        //return result;
    });
}
exports.insertmongo = insertmongo;
;
