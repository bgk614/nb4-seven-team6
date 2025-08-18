// error.middleware.ts

export function errorMiddleware(err: any, _req: any, res: any, _next: any) {
  const status = err?.status ?? 500;
  const message = err?.message ?? 'Internal Server Error';
  if (process.env.NODE_ENV !== 'test') console.error(err);
  res.status(status).json({ ok: false, message });
}
