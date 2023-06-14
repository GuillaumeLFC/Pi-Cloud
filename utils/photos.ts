import exifr from 'exifr';

export class Photo {
    id?: string;
    filextension ?: string;

    //Define metadata properties 
    //@ts-ignore
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

    constructor (isNew = true, id = null) {
        if (isNew) {
            this.id = generateid()
        }
        this.metadata = {};
    }
    async extractmetadata (file) {
        try {
            const TagsToExtract = [0x0100, 0x0101, 0x011A, 0x011B, 0x9003, 0x0002, 0x0004, 0x9000];
            const metadata = await exifr.parse(file, TagsToExtract);
            return metadata;
        } catch(error) {
            console.log(error);
        }
    };

    savemetadata (metadata) {

        //const metadata = JSON.parse(metadataJson);
        this.metadata.ImageWidth = metadata.ImageWidth;
        this.metadata.ImageHeight = metadata.ImageHeight;
        this.metadata.XResolution = metadata.XResolution;
        this.metadata.YResolution = metadata.YResolution;
        this.metadata.ExifVersion = metadata.ExifVersion;
        this.metadata.DateTimeOriginal = metadata.DateTimeOriginal;
        this.metadata.Latitude = metadata.latitude;
        this.metadata.Longitude = metadata.longitude;
    };

}

export function generateid() {

    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = String(Date.now())

    for (let i = 0 ; i < 8 ; i++) {
        const randomindex = Math.floor(Math.random() * alphanumeric.length);
        id += alphanumeric.charAt(randomindex); 
    };

    return id;
};

