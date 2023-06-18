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
exports.importPhoto = void 0;
const photos_1 = require("../utils/photos");
function importPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const file of req.files) {
                const id = getIDfromfilename(file.filename);
                const photo = new photos_1.Photo(id, file.path);
                handlemetadata(photo);
                photo.filextension = getextension(file.filename);
            }
            ;
            res.send('Photos uploadées');
        }
        catch (error) {
            console.log(error);
            res.send(error);
        }
        ;
    });
}
exports.importPhoto = importPhoto;
;
function handlemetadata(photo) {
    return __awaiter(this, void 0, void 0, function* () {
        const metadata = yield photo.extractmetadata(photo.path);
        photo.savemetadata(metadata);
    });
}
;
function getIDfromfilename(filename) {
    const lastIndex = filename.lastIndexOf('.');
    if (lastIndex === -1) {
        return filename;
    }
    ;
    return filename.slice(0, lastIndex);
}
;
function getextension(filename) {
    if (filename.includes('.jpg')) {
        return 'jpg';
    } //à developper
    return 'jpg';
}
;
