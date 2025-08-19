import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).json({
    ok: false,
    status,
    message,
    errors: err.errors ?? null, // Zod 에러면 배열, 아니면 null
    path: req.originalUrl,
    timestamp: new Date().toISOString(),
  });
};
