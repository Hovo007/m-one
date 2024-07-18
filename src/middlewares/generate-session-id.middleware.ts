import { Request, Response, NextFunction } from 'express';
export function generateSessionIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  next();
}
