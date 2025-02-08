import { NextFunction, Request, Response } from 'express';

export async function HelloController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  res.status(200).send({ message: 'server is working' });
}
