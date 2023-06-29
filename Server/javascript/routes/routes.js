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
const express_1 = require("express");
const import_photos_1 = require("../controller/import_photos");
const photos_1 = require("../middleware/multer/photos");
const multer_1 = __importDefault(require("multer"));
const router = (0, express_1.Router)();
//Middlewares
const multerUploadPhoto = photos_1.uploadsPhotos.array('photos');
// Error handling middleware for Multer
const handleMulterError = (err, req, res, next) => {
    console.log('handlemulter error appelé');
    if (err instanceof multer_1.default.MulterError) {
        // Multer-specific error occurred (e.g., file size exceeded)
        console.log(err.message);
    }
    else {
        // Other generic errors occurred during file upload
        console.log(err.message);
    }
};
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("Serveur en ligne !");
}));
router.post('/', multerUploadPhoto, handleMulterError, (req, res) => {
    if (req.files) {
        (0, import_photos_1.importPhoto)(req, res);
    }
    else {
        res.send('Aie ça a pas marché !!');
    }
});
router.use(handleMulterError);
exports.default = router;
