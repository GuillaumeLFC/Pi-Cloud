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
    destination: "./photos",
    filename: function (req, file, cb) {
        const filename = (0, photos_js_1.generateid)() + '.jpg';
        console.log(filename);
        cb(null, filename);
    }
});
const uploads = (0, multer_1.default)({ storage: storage });
app.post('/', uploads.array('photos'), async (req, res) => {
    const photo = new photos_js_1.Photo();
    res.send('Photo uploadée et métadonnées extraites !');
});
app.get('/', async (req, res) => {
    res.send("Serveur en ligne");
});
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
});
