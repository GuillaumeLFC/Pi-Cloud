const express = require('express');
const multer = require('multer');
const { Photos, generateid } = require('./photos.js');
const app = express();

const storage = multer.diskStorage({
    destination : "./photos",
    filename : function (req, file, cb) {
        const filename = generateid() + '.jpg';
        console.log(filename);
        cb(null, filename);
    }
});

const uploads = multer({storage : storage});

app.post('/',uploads.array('photos'), async (req, res) => {
    const photo = new Photos()
    res.send('Photo uploadée et métadonnées extraites !');
});

app.get('/',async (req, res) => {
  res.send("Serveur en ligne");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});
