import 'dotenv/config';
import express from 'express';
import { config } from './config.js';
import loaders from './loaders/index.js';
import requestLogger from './middlewares/loggerMiddleware.js';
import { scheduleServerChecks } from './utils/scheduler.js';

const app = express();

app.use(requestLogger);

scheduleServerChecks();

loaders(app);

app.listen(config.PORT, () => {
  console.log('Server listening to port', config.PORT);
});
