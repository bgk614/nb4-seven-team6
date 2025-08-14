import express from 'express';

import { getGroupsController } from '../controllers/group/get_group.controller';
import { getGroupByIdController } from '../controllers/group/get_group_by_id.controller';
import { recommendGroup } from '../controllers/group/recommend_group.controller.js';
import { joinGroup } from '../controllers/group/join_group.controller.js';
import { leaveGroup } from '../controllers/group/leave_group.controller.js';
import { createGroupController } from '../controllers/group/create_group.controller.ts';
import { createGroupService } from '../services/group/create_group.service.ts';
import { validateGroupQuery, validateID } from '../middleware/group.middleware';

export const groupRouter = express.Router();

// 그룹 목록/상세 조회
groupRouter
  .route('/')
  .get(validateGroupQuery, getGroupsController) // 목록 조회
  .post(createGroupController);

groupRouter.get('/:id', validateID, getGroupByIdController); // 상세 조회

// 그룹 추천/참여/탈퇴
groupRouter.post('/:groupId/recommend', recommendGroup);
groupRouter.post('/:groupId/join', joinGroup);
groupRouter.post('/:groupId/leave', leaveGroup);
