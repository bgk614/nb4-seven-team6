// middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  (schema: ZodSchema) => (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err: any) {
      // Zod 에러를 공통 에러 미들웨어로 넘김
      next({
        status: 400,
        message: 'Validation failed',
        errors: err.errors, // 상세한 검증 에러 정보도 같이
      });
    }
  };
