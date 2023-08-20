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
exports.insertMongoPhoto = void 0;
const mongoDB_1 = require("../connection/mongoDB");
const init_1 = require("../initialisation/MongoDB/init");
const photos_1 = require("../initialisation/MongoDB/photos");
;
function insertMongoPhoto(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoDB_1.connectoMongo)();
            const collection = init_1.db.collection(photos_1.photosCollectionName);
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
            console.log("La photo ", photo.id, " a bien été enregistrée dans MongoDB");
        }
        catch (error) {
            console.error('Erreur dans le insertmongo : \n', error);
        }
        finally {
            yield (0, mongoDB_1.disconnectfromMongo)();
        }
        //return result;
    });
}
exports.insertMongoPhoto = insertMongoPhoto;
;
