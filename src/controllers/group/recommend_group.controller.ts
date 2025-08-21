// 그룹 추천 컨트롤러
import { Request, Response, NextFunction } from 'express';
import { recommendGroup as recommendGroupService } from '../../services/group/recommend_group.service.js';

// POST /groups/:groupId/recommend - 그룹 추천수 증가
export async function recommendGroup(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const groupId = Number(req.params.groupId);
    const result = await recommendGroupService(groupId);
    res.json(result);
  } catch (err) {
    next(err);
  }
}
