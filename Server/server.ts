import express from 'express';
import routes from './routes/routes';
import { initMongo } from './databases/initialisation/mongoDB/init';

async function InitDatabases(){
  await initMongo();
}

async function LaunchServer(){
  await InitDatabases();
  const app = express();

  app.use(routes);

  const port = 3000;
  app.listen(port, () => {
    console.log(`Le serveur tourne sur le port ${port}`);
  });
}

LaunchServer();