import 'dotenv/config';
import express from 'express';
import { config } from './config.js';
import loaders from './loaders/index.js';

const app = express();

loaders(app);

app.listen(config.PORT, () => {
  console.log('Server listening to port', config.PORT);
});
