import { Router } from 'express';
import { HelloController } from '../controllers/index.js';
import { serverStatusCache } from '../utils/serverStatusCache.js';

const router = Router();

// Common route
router.get('/', HelloController);

// Check status
router.get('/status', (req, res) => {
  res.send(serverStatusCache);
});

export default router;
