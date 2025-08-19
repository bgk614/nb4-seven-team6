import { Request, Response } from 'express';
import { getGroupByIdService } from '../../services/group/get_group_by_id.service';

// 그룹 상세 조회
export async function getGroupByIdController(req: Request, res: Response) {
  try {
    const groupId = parseInt(req.params.groupId as string);
    const group = await getGroupByIdService(groupId);
    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }
    return res.json(group);
  } catch (e: any) {
    return res.status(500).json({ message: e.message });
  }
}
