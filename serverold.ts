import express from 'express';
import multer from 'multer';
import { Photo, generateid } from './utils/photos.js';

const app = express();

const storage = multer.diskStorage({
    destination : "/app/photos",
    filename : function (req, file, cb) {
        const filextension = extension(file);
        const filename = generateid() + filextension;
        cb(null, filename);
    }
});

function extension (file) {
  const mimetype = file.mimetype;
  if (mimetype === '/image/jpeg') {
    return '.jpg';
  } else {
    //à developper...
    return '.jpg';
  }
};

function getextension (filename) {
  if (filename.includes('.jpg')) {
    return 'jpg'
  } //à developper...
};

const uploads = multer({
  storage : storage,
  limits : { fileSize : 10 * 1024 *1024 }
});

app.post('/',uploads.array('photos'), async (req, res) => {
  req.files.forEach(async file => {
    const photo = new Photo(false, file.name);
    photo.filextension = getextension(file.filename);
    const metadata = await photo.extractmetadata(file.path);
    photo.savemetadata(metadata);  
  });

  res.send('Fichiers uploadés');
});

app.get('/',async (req, res) => {
  res.send("Serveur en ligne ");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
