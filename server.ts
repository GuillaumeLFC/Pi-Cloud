import express from 'express';
import routes from './routes/routes';

import { connectMongo } from './models/mongodb/connection';
connectMongo();

const app = express();

app.use(routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

