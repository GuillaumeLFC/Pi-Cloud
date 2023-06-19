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
const photosCollectionName = 'photos';
const db = connection_1.client.db("photos");
/**
 * Crée la collection avec le schema de validation et les indexes pour les photos.
 * @param collectionName
 * @returns La collection créer.
 */
function createCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield db.createCollection(collectionName, {
            validator: { $jsonSchema: {
                    required: ["_id", "path"],
                    properties: {
                        _id: { bsonType: "string" },
                        path: { bsonType: "string" }
                    }
                } }
        });
        return collection;
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
            console.log(index.name, 'créer !');
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
        console.log('état collectionExist : ', collectionExist);
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
            console.log('On execute le if');
            const collection = yield createCollection(collectionName);
            yield checkAndCreateIndexes(collection);
            return collection;
        }
        ;
        console.log('On execute pas le if');
        const collection = db.collection(collectionName);
        yield checkAndCreateIndexes(collection);
        return collection;
    });
}
;
function insertmongo(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const collection = yield getCollection(photosCollectionName);
        const document = {
            id: photo.id,
            path: photo.path,
            filextension: photo.filextension,
            DateAndTimeISO: photo.DateAndTimeISO,
            metadata: photo.metadata,
        };
        const result = yield collection.insertOne(document);
        return result;
    });
}
exports.insertmongo = insertmongo;
;
