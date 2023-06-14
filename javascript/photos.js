var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import exifr from 'exifr';
export class Photo {
    constructor(isNew = true, id = null) {
        if (isNew) {
            this.id = generateid();
        }
        this.metadata = {};
    }
    extractmetadata(file) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const TagsToExtract = [0x0100, 0x0101, 0x011A, 0x011B, 0x9003, 0x0002, 0x0004, 0x9000];
                const metadata = yield exifr.parse(file, TagsToExtract);
                return metadata;
            }
            catch (error) {
                console.log(error);
            }
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
export function generateid() {
    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = String(Date.now());
    for (let i = 0; i < 8; i++) {
        const randomindex = Math.floor(Math.random() * alphanumeric.length);
        id += alphanumeric.charAt(randomindex);
    }
    ;
    return id;
}
;
