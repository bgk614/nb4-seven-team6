// 그룹 참여 컨트롤러
import { Request, Response, NextFunction } from 'express';
import { joinGroup as joinGroupService } from '../../services/group/join_group.service.js';

// POST /groups/:groupId/join - 그룹 참여
export async function joinGroup(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const groupId = Number(req.params.groupId);
    const { nickname, password } = req.body;
    const created = await joinGroupService(groupId, { nickname, password });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}
