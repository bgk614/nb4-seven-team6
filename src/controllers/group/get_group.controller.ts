import { Request, Response } from 'express';
import * as groupService from '../../services/group/get_group.service';

// 그룹 목록 조회
export async function getGroupsController(req: Request, res: Response) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const order = (req.query.order as string) || 'desc';
    const orderBy = (req.query.orderBy as string) || 'createdAt';
    const search = (req.query.search as string) || undefined;
    const result = await groupService.fetchGroups({
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

// 그룹 상세 조회
export async function getGroupById(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id as string);
    const group = await groupService.fetchGroupById(id);
    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }
    res.json(group);
  } catch (e: any) {
    res.status(500).json({ message: e.message });
  }
}
