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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const photos_js_1 = require("./utils/photos.js");
const app = (0, express_1.default)();
const storage = multer_1.default.diskStorage({
    destination: "/app/photos",
    filename: function (req, file, cb) {
        const filextension = extension(file);
        const filename = (0, photos_js_1.generateid)() + filextension;
        cb(null, filename);
    }
});
function extension(file) {
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
function getextension(filename) {
    if (filename.includes('.jpg')) {
        return 'jpg';
    } //à developper...
}
;
const uploads = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});
app.post('/', uploads.array('photos'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const photo = new photos_js_1.Photo(false, file.name);
        photo.filextension = getextension(file.filename);
        const metadata = yield photo.extractmetadata(file.path);
        photo.savemetadata(metadata);
    }));
    res.send('Fichiers uploadés');
}));
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Serveur en ligne ");
}));
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});
