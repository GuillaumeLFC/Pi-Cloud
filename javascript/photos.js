"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateid = exports.Photo = void 0;
class Photo {
    id;
    constructor(isNew = true, id = null) {
        if (isNew) {
            this.id = generateid();
        }
    }
    extractmetadata(buffer) {
        const TagsToExtract = { pick: [0x011A, 0x011B, 0x0132, 0x013B, 0x0002, 0x0004, 0x0006, 0x9003] };
        //const metadata = exifr.pick(TagsToExtract);
        //console.log(metadata);
        //return metadata
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
