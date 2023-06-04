import express from 'express';
import multer from 'multer';
import { Photo, generateid } from './photos.js';

const app = express();

const storage = multer.diskStorage({
    destination : "./photos",
    filename : function (req, file, cb) {
        const filename = generateid() + '.jpg';
        cb(null, filename);
        console.log(`${filename} uploadé `);
    }
});

const uploads = multer({storage : storage});

app.post('/',uploads.array('photos'), async (req, res) => {
  req.files.forEach(file => {
    res.send(file.filename)
    const photo = new Photo(false, file.name);
    const metadata = photo.extractmetadata(file.path);
    console.log(metadata);   
  });
});

app.get('/',async (req, res) => {
  res.send("Serveur en ligne sur le localhost");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
