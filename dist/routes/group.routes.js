import express from 'express';
import { recommendGroup } from '../controllers/group/recommend_group.controller';
import { joinGroup } from '../controllers/group/join_group.controller';
import { leaveGroup } from '../controllers/group/leave_group.controller';
import * as Params from '../models/group/index';
import * as Controller from '../controllers/group/index';
import { validate } from '../middleware/validate.middleware';
export const groupRouter = express.Router();
groupRouter.post('/:groupId/recommend', recommendGroup); // 추천수 증가
groupRouter.post('/:groupId/join', joinGroup); // 그룹 참여
groupRouter.post('/:groupId/leave', leaveGroup); // 그룹 탈퇴
groupRouter
    .route('/')
    .post(validate(Params.CreateGroupSchema), Controller.createGroupController);
groupRouter
    .route('/:groupId')
    .patch(validate(Params.UpdateGroupSchema), Controller.updateGroupController)
    .delete(Controller.deleteGroupController);
