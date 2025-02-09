import { Router } from 'express';
import { HelloController } from '../controllers/index.js';
import {
  checkBlogAPI,
  checkEasyWGServer,
  checkPostgresServer,
  checkSSHserver,
  checkWebminServer,
  checkYachtServer,
} from '../controllers/checkServerController.js';

const router = Router();

// Common route
router.get('/', HelloController);

// Check routes
router.get('/checkssh', checkSSHserver);
router.get('/checkpostgres', checkPostgresServer);
router.get('/checkblogapi', checkBlogAPI);
router.get('/checkyacht', checkYachtServer);
router.get('/checkeasywg', checkEasyWGServer);
router.get('/checkwebmin', checkWebminServer);

export default router;
