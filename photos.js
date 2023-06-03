const exifr = require('exifr');


class Photo {
    constructor (isNew = true, id = null) {
        if (isNew) {
            this.id = generateid()
        }
    }

    extractmetadata (buffer) {
        TagsToExtract = {pick : [0x011A,0x011B,0x0132,0x013B,0x0002,0x0004,0x0006,0x9003]};
        const metadata = exifr.pick(TagsToExtract);
        console.log(metadata);
        return metadata
    };

}


function generateid() {

    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let id = Date.now()

    for (let i = 0 ; i < 8 ; i++) {
        const randomindex = Math.floor(Math.random() * alphanumeric.length);
        id += alphanumeric.charAt(randomindex); 
    };

    return id;
};

module.exports = {
    Photo,
    generateid
};