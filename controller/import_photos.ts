import { Photo } from "../utils/photos";

export function importPhoto(req , res) {
    req.files.forEach(async file => {
        const photo = new Photo(false, file.name);
        photo.filextension = getextension(file.filename);
        const metadata = await photo.extractmetadata(file.path);
        photo.savemetadata(metadata);  
      });
    res.send('Photos uploadées')
};

function getextension (filename) {
    if (filename.includes('.jpg')) {
      return 'jpg'
    } //à developper...
  };
