import { Request, Response, NextFunction } from 'express';
import { updateGroupService } from '../../services/group/update_group.service';
import { UpdateGroupRequest } from '../../models/group/update_group.dto';

export const updateGroupController = async (
  req: Request<{ groupId: string }, {}, UpdateGroupRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const groupId = Number(req.params.groupId);
    if (isNaN(groupId)) {
      return res.status(400).json({ message: '잘못된 그룹 ID' });
    }

    const data: UpdateGroupRequest = req.body;
    const group = await updateGroupService(groupId, data);

    return res.status(200).json(group);
  } catch (error: any) {
    if (error.message === '권한 없음') {
      return res.status(403).json({ message: '오너만 수정할 수 있습니다.' });
    }
    if (error.message === '그룹 없음') {
      return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
    }

    return next(error);
  }
};
