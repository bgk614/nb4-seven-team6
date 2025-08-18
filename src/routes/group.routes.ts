import express from 'express';
import {
  getGroups,
  getGroupById,
} from '../controllers/group/get_group.controller';
import { validateGroupQuery, validateID } from '../middleware/group.middleware';

const router = express.Router();

router.get('/groups', validateGroupQuery, getGroups);
router.get('/groups/:id', validateID, getGroupById);

export default router;
