import {
  checkSSHserver,
  checkPostgresServer,
  checkBlogAPI,
  checkYachtServer,
  checkEasyWGServer,
  checkWebminServer,
} from '../controllers/checkServerController.js';
import { serverStatusCache } from './serverStatusCache.js';

export function scheduleServerChecks() {
  async function updateStatus() {
    try {
      serverStatusCache.ssh = await checkSSHserver();
      serverStatusCache.postgres = await checkPostgresServer();
      serverStatusCache.blogAPI = await checkBlogAPI();
      serverStatusCache.yacht = await checkYachtServer();
      serverStatusCache.easyWG = await checkEasyWGServer();
      serverStatusCache.webmin = await checkWebminServer();
    } catch (error) {
      console.error('Error updating server status:', error);
    }
  }

  updateStatus();

  setInterval(updateStatus, 10 * 60 * 1000);
}
