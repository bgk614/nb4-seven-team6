import { Request, Response } from 'express';
import { getGroupByIdService } from '../../services/group/get_group_by_id.service';

// 그룹 상세 조회
export async function getGroupByIdController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const group = await getGroupByIdService(id);
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
