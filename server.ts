import express from 'express';
import routes from './routes/routes';
import { waitForMongoDB } from './waitMongo';
import { connectoMongo } from './models/mongodb/connection';

async function initMongo () {
  try {
    await waitForMongoDB();
    await connectoMongo();
  }catch(error) {
    console.error(error);
  };
};
initMongo();


const app = express();

app.use(routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

