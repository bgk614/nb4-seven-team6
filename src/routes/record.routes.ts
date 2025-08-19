// src/routes/record.routes.ts

import { Router } from 'express';
import { registerRecord,
  getAllRecords,
  getRecordRankings,
  getRecordById} from '../controllers/record.controller';

const r = Router();

// 그룹별 운동 기록 등록
r.post('/groups/:groupId/records', registerRecord);
r.get('/groups/:groupId/records', getAllRecords); // 모든 기록 조회 (페이지네이션, 정렬)
r.get('/groups/:groupId/rank', getRecordRankings); // 랭킹 조회
r.get('/groups/:groupId/records/:recordId', getRecordById); // 상세 조회

export default r;
