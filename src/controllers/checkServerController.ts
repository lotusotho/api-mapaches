import { NextFunction, Request, response, Response } from 'express';
import { Client as ClientSSH } from 'ssh2';
import { config } from '../config.js';
import pkg from 'pg';
const { Client: ClientPG } = pkg;

export async function checkSSHserver(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const conn = new ClientSSH();
  conn
    .on('ready', () => {
      res.status(200).send({ message: 'SSH Server is up and running' });
      conn.end();
    })
    .on('error', (err) => {
      const error = err as Error;
      res.status(500).send({ error: 'SSH Server is down: ' + error.message });
    })
    .connect({
      host: 'server.mapach.es',
      port: 22,
      username: config.SSH_USER,
      password: config.SSH_PASS,
    });
}

export async function checkPostgresServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const client = new ClientPG({
    host: 'server.mapach.es',
    port: 5432,
    user: config.PG_USER,
    password: config.PG_PASS,
    database: config.PG_DB,
  });

  try {
    await client.connect();
    res.status(200).send({ message: 'PostgreSQL Server is up and running' });
  } catch (err) {
    const error = err as Error;
    res
      .status(500)
      .send({ error: 'PostgreSQL Server is down: ' + error.message });
  } finally {
    await client.end();
  }
}

export async function checkBlogAPI(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await fetch('https://server.mapach.es');
    const data = await response.json();
    res.status(200).send({ message: data.message });
  } catch (err) {
    const error = err as Error;
    res.status(500).send('Error fetching Blog API: ' + error.message);
  }
}

export async function checkYachtServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await fetch('http://server.mapach.es:8000');
    if (response.ok) {
      res.status(200).send({ message: 'Yacht server is up and running' });
    } else {
      res.status(500).send({ error: 'Yacht server is down' });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send('Error checking Yacht server: ' + error.message);
  }
}

export async function checkEasyWGServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await fetch('http://server.mapach.es:51821');
    if (response.ok) {
      res.status(200).send({ message: 'Easy-WG server is up and running' });
    } else {
      res.status(500).send({ error: 'Easy-WG server is down' });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send('Error checking Easy-WG server: ' + error.message);
  }
}

export async function checkWebminServer(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const response = await fetch('http://server.mapach.es:10000');
    if (response.ok) {
      res.status(200).send({ message: 'Webmin server is up and running' });
    } else {
      res.status(500).send({ error: 'Webmin server is down' });
    }
  } catch (err) {
    const error = err as Error;
    res.status(500).send('Error checking Webmin server: ' + error.message);
  }
}
