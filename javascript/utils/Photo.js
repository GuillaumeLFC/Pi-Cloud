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
exports.Photo = void 0;
const exifr_1 = __importDefault(require("exifr"));
const photos_1 = require("./photos");
class Photo {
    constructor(id, path) {
        if (id) {
            this.id = id;
        }
        else {
            this.id = (0, photos_1.generateid)();
        }
        ;
        this.path = path;
        this.metadata = {};
    }
    ;
    extractmetadata(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TagsToExtract = [256, 257, 282, 283, 36867, 2, 4, 36864];
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
        this.metadata.ImageWidth = metadata.ImageWidth;
        this.metadata.ImageHeight = metadata.ImageHeight;
        this.metadata.XResolution = metadata.XResolution;
        this.metadata.YResolution = metadata.YResolution;
        this.metadata.ExifVersion = metadata.ExifVersion;
        this.metadata.DateTimeOriginal = metadata.DateTimeOriginal;
        this.metadata.Latitude = metadata.latitude;
        this.metadata.Longitude = metadata.longitude;
        this.DateAndTimeISO = metadata.DateTimeOriginal;
    }
    ;
}
exports.Photo = Photo;
