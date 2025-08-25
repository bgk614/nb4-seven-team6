import { Request, Response } from 'express';
import { getGroupMemRankService } from '../../services/group/get_group_mem_rank.service.js';

export async function getGroupMemRankController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.groupId as string);
    const order: 'asc' | 'desc' = req.query.order === 'asc' ? 'asc' : 'desc';
    const duration: 'weekly' | 'monthly' =
      req.query.duration === 'weekly' ? 'weekly' : 'monthly';
    const result = await getGroupMemRankService(id, order, duration);
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
