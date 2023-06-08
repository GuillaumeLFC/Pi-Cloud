import express from 'express';
import multer from 'multer';
import { Photo, generateid } from './photos.js';

const app = express();

const storage = multer.diskStorage({
    destination : "/app/photos",
    filename : function (req, file, cb) {
        const filename = generateid() + '.jpg';
        cb(null, filename);
    }
});

const uploads = multer({
  storage : storage,
  limits : { fileSize : 10 * 1024 *1024 }
});

app.post('/',uploads.array('photos'), async (req, res) => {
  req.files.forEach(async file => {
    const photo = new Photo(false, file.name);
    const metadata = await photo.extractmetadata(file.path);
    photo.savemetadata(metadata);  
  });
  res.send('Fichiers uploadés et metadonnées extraites');
});

app.get('/',async (req, res) => {
  res.send("Serveur en ligne ");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
