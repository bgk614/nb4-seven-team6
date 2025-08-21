import express from 'express';

import { getGroupsController } from '../controllers/group/get_group.controller';
import { getGroupByIdController } from '../controllers/group/get_group_by_id.controller';
import { getGroupMemRankController } from '@/controllers/group/get_group_mem_rank.controller';
import { recommendGroup } from '../controllers/group/recommend_group.controller';
import { joinGroup } from '../controllers/group/join_group.controller';
import { leaveGroup } from '../controllers/group/leave_group.controller';
import { validateGroupQuery, validateID } from '../middleware/group.middleware';
import * as Params from '../models/group/index';
import * as Controller from '../controllers/group/index';
import { validate } from '../middleware/validate.middleware';
export const groupRouter = express.Router();

groupRouter
  .route('/')
  .get(validateGroupQuery, getGroupsController) // 목록 조회
  .post(validate(Params.CreateGroupSchema), Controller.createGroupController);

groupRouter.post('/:groupId/recommend', recommendGroup); // 추천수 증가
groupRouter.post('/:groupId/join', joinGroup); // 그룹 참여
groupRouter.post('/:groupId/leave', leaveGroup); // 그룹 탈퇴

groupRouter
  .route('/:groupId')
  .get(validateID, getGroupByIdController) // 상세 조회
  .patch(validate(Params.UpdateGroupSchema), Controller.updateGroupController)
  .delete(Controller.deleteGroupController);

groupRouter.get('/:groupId/rank', validateID, getGroupMemRankController); // 랭킹 조회
