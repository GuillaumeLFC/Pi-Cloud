
import { Photo } from "../utils/photos";
import { uploadsPhotos } from "../middleware/multer/photos";

export function importPhoto(req , res) {
    req.files.forEach(async file => {
        const photo = new Photo(false, file.name, file.path);
        handlemetadata(photo);
        photo.filextension = getextension(file.filename); 
      });
    res.send('Photos uploadées')
};

async function handlemetadata (photo,) {
    const metadata = await photo.extractmetadata(photo.path);
    photo.savemetadata(metadata);  
};

function getextension (filename) {
    if (filename.includes('.jpg')) {
      return 'jpg'
    } //à developper...
  };
