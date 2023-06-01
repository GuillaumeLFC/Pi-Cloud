const express = require('express');
const multer = require('multer');
const { Photos, generateid } = require('./photos.js');
const app = express();

const storage = multer.diskStorage({
    destination : "/photos",
    filename : function (file, cb) {
        const filename = generateid() + file.encoding;
        cb (null, filename);
    }
});

const uploads = multer({dest : storage});

app.post('/',uploads.array('photos'), async (req, res) => {
    res.send('Bonne nuit frero normalement ça marche');
});

app.get('/',async (req, res) => {
  res.send("Serveur en ligne");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});