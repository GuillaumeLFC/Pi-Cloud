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
exports.generateid = exports.Photo = void 0;
const exifr_1 = __importDefault(require("exifr"));
class Photo {
    constructor(isNew = true, id = null, path) {
        if (isNew) {
            this.id = generateid();
        }
        ;
        if (path) {
            this.path = path;
        }
        ;
        this.metadata = {};
    }
    ;
    extractmetadata(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TagsToExtract = [0x0100, 0x0101, 0x011A, 0x011B, 0x9003, 0x0002, 0x0004, 0x9000];
                const metadata = yield exifr_1.default.parse(file, TagsToExtract);
                return metadata;
            }
            catch (error) {
                console.log(error);
            }
            ;
        });
    }
    ;
    savemetadata(metadata) {
        //const metadata = JSON.parse(metadataJson);
        this.metadata.ImageWidth = metadata.ImageWidth;
        this.metadata.ImageHeight = metadata.ImageHeight;
        this.metadata.XResolution = metadata.XResolution;
        this.metadata.YResolution = metadata.YResolution;
        this.metadata.ExifVersion = metadata.ExifVersion;
        this.metadata.DateTimeOriginal = metadata.DateTimeOriginal;
        this.metadata.Latitude = metadata.latitude;
        this.metadata.Longitude = metadata.longitude;
    }
    ;
}
exports.Photo = Photo;
function generateid() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = String(Date.now());
    for (let i = 0; i < 8; i++) {
        const randomindex = Math.floor(Math.random() * alphanumeric.length);
        id += alphanumeric.charAt(randomindex);
    }
    ;
    return id;
}
exports.generateid = generateid;
;
