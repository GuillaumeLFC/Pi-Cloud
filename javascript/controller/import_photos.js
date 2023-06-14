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
    req.files.forEach((file) => __awaiter(this, void 0, void 0, function* () {
        const photo = new photos_1.Photo(false, file.name);
        photo.filextension = getextension(file.filename);
        const metadata = yield photo.extractmetadata(file.path);
        photo.savemetadata(metadata);
    }));
    res.send('Photos uploadées');
}
exports.importPhoto = importPhoto;
;
function getextension(filename) {
    if (filename.includes('.jpg')) {
        return 'jpg';
    } //à developper...
}
;
