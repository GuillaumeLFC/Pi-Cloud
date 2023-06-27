import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Le serveur tourne sur le port ${port}`);
});

