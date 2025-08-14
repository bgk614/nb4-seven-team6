import { recommendGroup as recommendGroupService } from '../../services/group/recommend_group.service.js';
// POST /groups/:groupId/recommend - 그룹 추천수 증가
export async function recommendGroup(req, res, next) {
    try {
        const groupId = Number(req.params.groupId);
        const result = await recommendGroupService(groupId);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
}
