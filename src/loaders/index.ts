import cors from 'cors';
import express from 'express';
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
}
