// src/routes/record.routes.ts

import { Router } from 'express';
import {
  registerRecord,
  getAllRecords,
  getRecordRankings,
  getAllUserRecords,
  getUserStats,
  getRecordById,
} from '../controllers/record.controller.js';
const r = Router();

// 그룹별 운동 기록 등록
r.post('/:groupId/records', registerRecord);
r.get('/:groupId/records', getAllRecords); // 모든 기록 조회 (페이지네이션, 정렬)
r.get('/:groupId/rank', getRecordRankings); // 랭킹 조회
r.get('/records', getAllUserRecords); // 모든 유저 운동기록 조회
r.get('/records/rankings', getRecordRankings); // 기록 랭킹 조회 (주간/월간)
r.get('/records/stats', getUserStats); // 유저 누적 통계 조회
// r.get('/:groupId/rank', getRecordRankings); // 랭킹 조회
r.get('/:groupId/records/:recordId', getRecordById); // 상세 조회

export default r;
