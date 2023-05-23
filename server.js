const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const uploads = multer({dest : '/photos'})

app.get
app.post('/',uploads.array('photos'),async (req, res) => {
  res.send('Heu ça a marché ?')
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});