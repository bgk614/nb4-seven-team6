// src/routes/record.routes.ts

import { Router } from 'express';

import {
  registerRecord,
  // getAllRecords,
  // getRecordRankings,
  // getRecordById,
} from '../controllers/record.controller.js';
const r = Router();

// 그룹별 운동 기록 등록
r.post('/groups/:groupId/records', registerRecord);

export default r;
