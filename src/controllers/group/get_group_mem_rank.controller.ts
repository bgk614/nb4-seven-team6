import { Request, Response } from 'express';
import { getGroupMemRankService } from '../../services/group/get_group_mem_rank.service';

export async function getGroupMemRankController(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const order = (req.query.order as string) || 'asc';
    const orderBy = (req.query.orderBy as string) || 'createdAt';
    const members = await getGroupMemRankService(id, { order, orderBy });
    res.json(members);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
