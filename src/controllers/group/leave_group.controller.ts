// 그룹 탈퇴 컨트롤러
import { Request, Response, NextFunction } from 'express';
import { leaveGroup as leaveGroupService } from '../../services/group/leave_group.service.js';

// POST /groups/:groupId/leave - 그룹 탈퇴
export async function leaveGroup(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const groupId = Number(req.params.groupId);
    const { nickname, password } = req.body;
    const ok = await leaveGroupService(groupId, { nickname, password });
    res.json({ left: ok });
  } catch (err) {
    next(err);
  }
}
