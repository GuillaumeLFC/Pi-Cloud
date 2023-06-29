import multer from 'multer';
import { generateid } from '../../utils/photos';

const storage = multer.diskStorage({
    destination : "/app/photos",
    filename : function (req, file, cb) {
        const filextension = extensionfromfile(file);
        const filename = generateid() + filextension;
        cb(null, filename);
    }
});

//Définit l'extension du fichier lors du premier enregistrement
function extensionfromfile (file) {
    const mimetype = file.mimetype;
    if (mimetype === '/image/jpeg') {
      return '.jpg';
    } else {
      //à developper...
      return '.jpg';
    }
};

export const uploadsPhotos = multer({
    storage : storage,
    limits : { fileSize : 20 * 1024 *1024 }
  });
