import { Router } from 'express';
import { getGroups, getGroupById } from '../controllers/group/get_group.controller';
import { recommendGroup } from '../controllers/group/recommend_group.controller.js';
import { joinGroup } from '../controllers/group/join_group.controller.js';
import { leaveGroup } from '../controllers/group/leave_group.controller.js';

import { validateGroupQuery, validateID } from '../middleware/group.middleware';

const router = Router();

// 그룹 목록/상세 조회
router.get('/groups', validateGroupQuery, getGroups); // 목록 조회
router.get('/groups/:id', validateID, getGroupById); // 상세 조회

// 그룹 추천/참여/탈퇴 API 엔드포인트
router.post('/:groupId/recommend', recommendGroup);  // 추천수 증가
router.post('/:groupId/join', joinGroup);            // 그룹 참여
router.post('/:groupId/leave', leaveGroup);          // 그룹 탈퇴

export default router;