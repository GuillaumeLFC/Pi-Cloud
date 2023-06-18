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
const db = connection_1.client.db("photos");
function createCollection(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonSchema = {
            required: ["_id", "path"],
            properties: {
                _id: { bsonType: "string" },
                path: { bsonType: "string" }
            }
        };
        yield db.createCollection(collectionName, {
            validator: { $jsonSchema: jsonSchema }
        });
    });
}
function collectionExist(collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const collections = yield db.listCollections().toArray();
        const collectionExist = collections.some(collection => collection.name === collectionName);
        return collectionExist;
    });
}
;
if (!collectionExist('photos')) {
    createCollection('photos');
}
const collection = db.collection('photos');
function insertmongo(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const document = {
            id: photo.id,
            path: photo.path,
            filextension: photo.filextension,
            DateAndTimeISO: photo.DateAndTimeISO,
            metadata: photo.metadata,
        };
    });
}
exports.insertmongo = insertmongo;
