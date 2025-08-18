import { Request, Response, NextFunction } from 'express';
import { createGroupService } from '../../services/group/index.ts';
import { CreateGroupRequest } from '../../models/group/index.ts';
import { GroupResponse } from '../../models/group/index.ts';

export const createGroupController = async (
  req: Request<{}, {}, CreateGroupRequest>,
  res: Response<GroupResponse>,
  next: NextFunction,
) => {
  try {
    const group = await createGroupService(req.body);
    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
};
