// 그룹 관련 라우터
import { Router } from 'express';
import { recommendGroup } from '../controllers/group/recommend_group.controller.js';
import { joinGroup } from '../controllers/group/join_group.controller.js';
import { leaveGroup } from '../controllers/group/leave_group.controller.js';

const router = Router();

// 그룹 추천/참여/탈퇴 API 엔드포인트
router.post('/:groupId/recommend', recommendGroup);  // 추천수 증가
router.post('/:groupId/join', joinGroup);            // 그룹 참여
router.post('/:groupId/leave', leaveGroup);          // 그룹 탈퇴

export default router;