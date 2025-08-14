import { createGroupService } from '@/services/group/create_group.service';
export const createGroupController = async (req, res, next) => {
    try {
        const group = await createGroupService(req.body);
        res.status(201).json(group);
    }
    catch (error) {
        next(error);
    }
};
