import exifr from 'exifr';
import { insertmongo } from '../models/mongodb/photos';

export class Photo {
    id: string;
    filextension ?: string;
    path : string;
    DateAndTimeISO : string;
    metadata : {
        ImageWidth ?: number;
        ImageHeight ?: number;
        XResolution ?: number;
        YResolution ?: number;
        ExifVersion ?: string;
        DateTimeOriginal ?: string;
        Latitude ?: number;
        Longitude ?: number;
      };


    constructor ( id : string, path : string, DateAndTimeISO ?: string) {
        if (id) {
            this.id = id
        } else {
            this.id = generateid()
        };
        if (DateAndTimeISO){
            this.DateAndTimeISO = DateAndTimeISO;
        } else {
            this.DateAndTimeISO = DateAndTimeISO = '';
        };
        this.path = path;
        this.metadata = {};
    };

    async extractmetadata (file) {
        try {
            const TagsToExtract = [0x0100, 0x0101, 0x011A, 0x011B, 0x9003, 0x0002, 0x0004, 0x9000];
            const metadata = await exifr.parse(file, TagsToExtract);
            return metadata;
        } catch(error) {
            console.log(error);
        };
    };

    savemetadata (metadata) {
        this.metadata.ImageWidth = metadata.ImageWidth;
        this.metadata.ImageHeight = metadata.ImageHeight;
        this.metadata.XResolution = metadata.XResolution;
        this.metadata.YResolution = metadata.YResolution;
        this.metadata.ExifVersion = metadata.ExifVersion;
        this.metadata.DateTimeOriginal = metadata.DateTimeOriginal;
        this.metadata.Latitude = metadata.latitude;
        this.metadata.Longitude = metadata.longitude;
        this.DateAndTimeISO = metadata.DateTimeOriginal;
    };
    async insertToMongo(){
        return await insertmongo(this);
    }
}

export function generateid() : string {
    let id = String(Date.now());
    for (let i = 0 ; i < 11 ; i++) {
        const randomindex = String(Math.floor(Math.random() * 10));
        id += randomindex;
    };
    return id;
};

