"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadsPhotos = void 0;
const multer_1 = __importDefault(require("multer"));
const photos_1 = require("../../utils/photos");
const storage = multer_1.default.diskStorage({
    destination: "/app/photos",
    filename: function (req, file, cb) {
        const filextension = extensionfromfile(file);
        const filename = (0, photos_1.generateid)() + filextension;
        cb(null, filename);
    }
});
//Définit l'extension du fichier lors du premier enregistrement
function extensionfromfile(file) {
    const mimetype = file.mimetype;
    if (mimetype === '/image/jpeg') {
        return '.jpg';
    }
    else {
        //à developper...
        return '.jpg';
    }
}
;
exports.uploadsPhotos = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});
