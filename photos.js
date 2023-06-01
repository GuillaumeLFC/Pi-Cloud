
class Photo {
    constructor (isNew = true, id = null) {
        if (isNew) {
            this.id = generateid()
        }
    }

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