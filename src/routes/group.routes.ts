import express from 'express';

import * as Params from '../models/group/index.js';
import * as Controller from '../controllers/group/index.js';
import * as Middleware from '../middleware/index.js';
export const groupRouter = express.Router();

groupRouter
  .route('/')
  .get(Middleware.validateGroupQuery, Controller.getGroupsController) // 그룹 목록 조회
  .post(Middleware.validate(Params.CreateGroupSchema), Controller.createGroupController); // 그룹 생성

groupRouter.post('/:groupId/likes', Controller.recommendGroup); // 그룹 추천
groupRouter.delete('/:groupId/likes', Controller.removeLike); // 그룹 추천 삭제

groupRouter
  .route('/:groupId/participants')
  .post(Controller.joinGroup) // 그룹 참여
  .delete(Controller.leaveGroup); // 그룹 나가기

groupRouter
  .route('/:groupId')
  .get(Middleware.validateID, Controller.getGroupByIdController) // 상세 조회
  .patch(Middleware.validate(Params.UpdateGroupSchema), Controller.updateGroupController) // 그룹 업데이트
  .delete(Controller.deleteGroupController); // 그룹 삭제

groupRouter.get('/:groupId/rank', Middleware.validateID, Controller.getGroupMemRankController); // 랭킹 조회
