// src/routes/record.routes.ts

import { Router } from 'express';
import {
  registerRecord,
  getAllRecords,
  getRecordRankings,
  getAllUserRecords,
  getUserStats,
} from '../controllers/record.controller';
const r = Router();

// 그룹별 운동 기록 등록
r.post('/groups/:groupId/records', registerRecord);
r.get('/groups/:groupId/records', getAllRecords); // 모든 기록 조회 (페이지네이션, 정렬)
r.get('/groups/:groupId/rank', getRecordRankings); // 랭킹 조회
r.get('/records', getAllUserRecords); // 모든 유저 운동기록 조회
r.get('/records/rankings', getRecordRankings); // 기록 랭킹 조회 (주간/월간)
r.get('/records/stats', getUserStats); // 유저 누적 통계 조회

export default r;
