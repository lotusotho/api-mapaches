import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import router from '../routes/index.js';

export default async function (server: any) {
  server.use(
    cors({
      origin: /https?:\/\/(.*\.)?mapach\.es$/,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: 'Content-Type, Authorization',
    })
  );

  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  server.use(router);

  server.get('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ error: 'Route not found' });
  });
}
