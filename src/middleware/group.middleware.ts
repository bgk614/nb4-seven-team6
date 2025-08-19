import { Request, Response, NextFunction } from 'express';

// order와 orderBy 값은 저 중 하나여야한다
export function validateGroupQuery(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const order = (req.query.order as string) || 'desc';
  const orderBy = (req.query.orderBy as string) || 'createdAt';

  const validOrder = ['asc', 'desc'];
  const validOrderBy = ['likeCount', 'participantCount', 'createdAt'];

  if (!validOrder.includes(order)) {
    return res.status(400).json({
      path: 'order',
      message:
        "The order parameter must be one of the following values: ['asc', 'desc'].",
    });
  }

  if (!validOrderBy.includes(orderBy)) {
    return res.status(400).json({
      path: 'orderBy',
      message:
        'The orderBy parameter must be one of the following values: [‘likeCount’, ‘participantCount’, ‘createdAt’].',
    });
  }
  next();
}

// ID는 숫자여야한다.
export function validateID(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ message: 'ID는 숫자여야합니다.' });
  }
  next();
}
