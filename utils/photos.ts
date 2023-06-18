import exifr from 'exifr';

export class Photo {
    id: string;
    filextension ?: string;
    path : string;

    //Define metadata properties 
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
    DateAndTimeISO ?: string;

    constructor ( id : string, path?) {

        if (id) {
            this.id = id
        } else {
            this.id = generateid()
        };

        if (path) {
            this.path = path;
        }else {
            throw "Path non renseigné lors de la création d'une instance Photo" //Peut mieux faire
        }
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

