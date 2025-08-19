import { Request, Response, NextFunction } from 'express';
import { deleteGroupService } from '../../services/group';

interface DeleteGroupRequest {
  nickname: string;
  password: string;
}

export const deleteGroupController = async (
  req: Request<{ groupId: string }, {}, DeleteGroupRequest>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const groupId = Number(req.params.groupId);
    if (isNaN(groupId)) {
      return res.status(400).json({ message: '잘못된 그룹 ID' });
    }

    const { nickname, password } = req.body;
    if (!nickname || !password) {
      return res
        .status(400)
        .json({ message: '닉네임과 비밀번호를 입력해주세요.' });
    }

    const result = await deleteGroupService(groupId, nickname, password);

    res.status(200).json(result);
  } catch (error: any) {
    if (error.message === '권한 없음') {
      return res.status(403).json({ message: '오너만 삭제할 수 있습니다.' });
    }
    if (error.message === '그룹 없음') {
      return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
    }

    return next(error);
  }
};
