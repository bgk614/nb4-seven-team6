// src/routes/timer.routes.ts

import { Router } from 'express';
import { prisma } from '../config/db';
import { startTimer, stopTimer } from '../utils/timer';
import { verifyPassword } from '../utils/password';

const r = Router();

/** 타이머 시작: 닉네임/비번 검증 후 발급 */
r.post('/start', async (req, res, next) => {
  try {
    const { groupId, nickname, password } = req.body ?? {};
    if (!groupId || !nickname || !password) {
      throw Object.assign(new Error('Missing fields'), { status: 400 });
    }
    const p = await prisma.participant.findFirst({
      where: { groupId: Number(groupId), nickname },
    });
    if (!p)
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    const ok = await verifyPassword(String(password), p.password);
    if (!ok)
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    const timerId = startTimer({
      groupId: Number(groupId),
      participantId: p.id,
    });
    res.status(201).json({ ok: true, timerId });
  } catch (e) {
    next(e);
  }
});

/** 타이머 종료: 서버가 실제 운동 시간 계산 */
r.post('/stop', async (req, res, next) => {
  try {
    const { timerId } = req.body ?? {};
    if (!timerId)
      throw Object.assign(new Error('Missing timerId'), { status: 400 });
    const result = stopTimer(String(timerId));
    res.json({ ok: true, ...result });
  } catch (e) {
    next(e);
  }
});

export default r;
