import { Client as ClientSSH } from 'ssh2';
import { config } from '../config.js';

export async function checkSSHserver(): Promise<any> {
  return new Promise((resolve, reject) => {
    const conn = new ClientSSH();
    conn
      .on('ready', () => {
        resolve({ message: 'SSH Server is up and running' });
        conn.end();
      })
      .on('error', (err) => {
        const error = err as Error;
        reject({ message: 'SSH Server is down: ' + error.message });
      })
      .connect({
        host: 'server.mapach.es',
        port: 22,
        username: config.SSH_USER,
        password: config.SSH_PASS,
      });
  });
}

export async function checkBlogAPI(): Promise<any> {
  try {
    const response = await fetch('https://server.mapach.es');
    const data = await response.json();
    return { message: data.message };
  } catch (err) {
    const error = err as Error;
    return { message: 'Error fetching Blog API: ' + error.message };
  }
}

export async function checkYachtServer(): Promise<any> {
  try {
    const response = await fetch('http://server.mapach.es:8000');
    if (response.ok) {
      return { message: 'Yacht server is up and running' };
    } else {
      return { message: 'Yacht server is down' };
    }
  } catch (err) {
    const error = err as Error;
    return { message: 'Error checking Yacht server: ' + error.message };
  }
}

export async function checkEasyWGServer(): Promise<any> {
  try {
    const response = await fetch('http://server.mapach.es:51821');
    if (response.ok) {
      return { message: 'Easy-WG server is up and running' };
    } else {
      return { message: 'Easy-WG server is down' };
    }
  } catch (err) {
    const error = err as Error;
    return { message: 'Error checking Easy-WG server: ' + error.message };
  }
}

export async function checkWebminServer(): Promise<any> {
  try {
    const response = await fetch('http://server.mapach.es:10000');
    if (response.ok) {
      return { message: 'Webmin server is up and running' };
    } else {
      return { message: 'Webmin server is down' };
    }
  } catch (err) {
    const error = err as Error;
    return { message: 'Error checking Webmin server: ' + error.message };
  }
}
