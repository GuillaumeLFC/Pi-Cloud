const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

const uploads = multer({dest : '/photos'})

// Set up a route to handle incoming requests
app.get('/', (req, res) => {
  const upload_test = path.join(__dirname, 'upload_test.html');
  res.sendFile(upload_test);
});

app.post('/uploads',upload.single('photo'),async (req, res) => {
  res.send('Heu ça a marché ?')
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});