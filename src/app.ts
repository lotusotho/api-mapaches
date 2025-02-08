import 'cors/config';
import express from 'express';
import { config } from './config.ts';

const app = express();

app.listen(config.PORT, () => {
  console.log('Server listening to port', config.PORT);
});
