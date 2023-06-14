var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import multer from 'multer';
import { Photo, generateid } from './photos.js';
const app = express();
const storage = multer.diskStorage({
    destination: "/app/photos",
    filename: function (req, file, cb) {
        const filextension = extension(file);
        const filename = generateid() + filextension;
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
const uploads = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }
});
app.post('/', uploads.array('photos'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.files.forEach((file) => __awaiter(void 0, void 0, void 0, function* () {
        const photo = new Photo(false, file.name);
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
