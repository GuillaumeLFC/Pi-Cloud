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
exports.checkAndValidateMongoPhotosRequirement = exports.photosCollectionName = void 0;
exports.photosCollectionName = 'photos';
let db;
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
            console.log('Les index "', index.name, '" ont bien été créer.');
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
        //console.log(`État collectionExist (${collectionName}) : ${collectionExist}`);
        return collectionExist;
    });
}
;
/**
 * Vérifie que les différents trucs de mongoDB sont présent pour les photos
 * @param collectionName Le nom souhaité.
 * @returns
 */
function checkAndValidateMongoPhotosRequirement(MongoDatabaseToCheck) {
    return __awaiter(this, void 0, void 0, function* () {
        db = MongoDatabaseToCheck;
        if (!(yield collectionExist(exports.photosCollectionName))) {
            yield createCollection(exports.photosCollectionName);
        }
        ;
        const collection = db.collection(exports.photosCollectionName);
        yield checkAndCreateIndexes(collection);
        return;
    });
}
exports.checkAndValidateMongoPhotosRequirement = checkAndValidateMongoPhotosRequirement;
;
