import * as groupService from '../../services/group/get_group.service.ts';

// 그룹 목록 조회
export async function getGroups(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const order = req.query.order || 'desc';
    const orderBy = req.query.orderBy || 'createdAt';
    const search = req.query.search || undefined;
    const result = await groupService.fetchGroups({
      page,
      limit,
      order,
      orderBy,
      search,
    });
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

// 그룹 상세 조회
export async function getGroupById(req, res) {
  try {
    const id = parseInt(req.params.id);
    const group = await groupService.fetchGroupById(id);
    if (!group) {
      return res.status(404).json({
        message: 'Group not found',
      });
    }
    res.json(group);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
