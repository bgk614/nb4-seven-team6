// src/routes/record.routes.ts

import { Router } from 'express';
import {
  registerRecord,
  getRecords,
} from '../controllers/record.controller.js';

const r = Router();

// 그룹별 운동 기록 등록
r.post('/groups/:groupId/records', registerRecord);

// 그룹별 운동 기록 조회
r.get('/groups/:groupId/records', getRecords);

export default r;
