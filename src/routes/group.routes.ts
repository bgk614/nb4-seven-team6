import express from 'express';

import { createGroupController } from '../controllers/group/create_group.controller.ts';
import { createGroupService } from '../services/group/create_group.service.ts';

export const groupRouter = express.Router();

groupRouter.route('/').post(createGroupController);
