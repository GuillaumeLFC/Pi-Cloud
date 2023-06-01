const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const uploads = multer({dest : '/app/photos'});

app.post('/',uploads.array('photos'),async (req, res) => {
  console.log(req.fiedname);
  console.log(req.originalname)
  res.send('Heu ça a marché ?');
});

app.get('/',async (req, res) => {
  res.send("Serveur en ligne");
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});