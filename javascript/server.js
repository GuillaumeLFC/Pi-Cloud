"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const photos_js_1 = require("./photos.js");
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
app.post('/', uploads.array('photos'), async (req, res) => {
    req.files.forEach(async (file) => {
        const photo = new photos_js_1.Photo(false, file.name);
        photo.filextension = getextension(file.filename);
        const metadata = await photo.extractmetadata(file.path);
        photo.savemetadata(metadata);
    });
    res.send('Fichiers uploadés');
});
app.get('/', async (req, res) => {
    res.send("Serveur en ligne ");
});
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});
