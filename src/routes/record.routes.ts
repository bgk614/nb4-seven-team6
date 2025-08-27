// src/routes/record.routes.ts

import { Router } from 'express';
import {
  registerRecord,
  getAllRecords,
  // getRecordRankings,
  getRecordById,
} from '../controllers/record.controller.js';
const r = Router();

// 그룹별 운동 기록 등록
r.post('/:groupId/records', registerRecord);
r.get('/:groupId/records', getAllRecords); // 모든 기록 조회 (페이지네이션, 정렬)

// r.get('/:groupId/rank', getRecordRankings); // 랭킹 조회
r.get('/:groupId/records/:recordId', getRecordById); // 상세 조회

export default r;
