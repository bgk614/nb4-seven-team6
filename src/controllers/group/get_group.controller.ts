import { Request, Response } from 'express';
import { getGroupsService } from '../../services/group/get_group.service';

// 그룹 목록 조회
export async function getGroupsController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const order = (req.query.order as string) || 'desc';
    const orderBy = (req.query.orderBy as string) || 'createdAt';
    const search = (req.query.search as string) || undefined;
    const result = await getGroupsService({
      page,
      limit,
      order,
      orderBy,
      search,
    });
    res.json(result);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
