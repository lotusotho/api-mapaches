import { Router } from 'express';
import { HelloController } from '../controllers/index.js';

const router = Router();

router.use('/', HelloController);

export default router;
