import { Request, Response } from 'express';
import { getGroupsService } from '../../services/group/get_group.service.js';

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
    // 프론트엔드가 기대하는 형태로 변환
    const transformedData = {
      ...result,
      data: result.data.map((group) => ({
        ...group,
        tags: group.tags.map((tag) => tag.name),
        badges: group.badges.map((badge) => badge.type),
      })),
    };
    res.json(transformedData);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
