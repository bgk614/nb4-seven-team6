// src/controllers/record.controller.ts
import { prisma } from '../config/db';
import { verifyPassword } from '../utils/password';
import {
  createRecord,
  validatePhotos,
  enforceTimer,
} from '../services/record.service'; // ✅ validateExercise 제거

export const registerRecord = async (req: any, res: any, next: any) => {
  try {
    const groupId = Number(req.params.groupId);
    const {
      nickname,
      password,
      exercise,
      description,
      seconds,
      distanceKm,
      photos,
      timerId,
    } = req.body ?? {};

    if (
      !groupId ||
      !nickname ||
      !password ||
      !exercise ||
      seconds == null ||
      !timerId
    ) {
      throw Object.assign(new Error('Missing required fields'), {
        status: 400,
      });
    }

    // 그룹 내 닉네임/비번 검증
    const participant = await prisma.participant.findFirst({
      where: { groupId, nickname },
    });
    if (!participant)
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    const ok = await verifyPassword(String(password), participant.password);
    if (!ok)
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    // ✅ 운동 종류: 소문자 표준화 후 간단 검증 (스키마가 run|bike|swim)
    const ex = String(exercise).trim().toLowerCase();
    if (!['run', 'bike', 'swim'].includes(ex)) {
      throw Object.assign(new Error('Invalid exercise type'), { status: 400 });
    }

    // 타이머 검증(서버 계산값과 동일해야 함)
    const verifiedSeconds = enforceTimer({
      timerId: String(timerId),
      groupId,
      participantId: participant.id,
      clientSeconds: Number(seconds),
    });

    // 거리/사진 검증
    if (distanceKm != null && Number(distanceKm) < 0) {
      throw Object.assign(new Error('distanceKm must be >= 0'), {
        status: 400,
      });
    }
    const photoUrls = validatePhotos(photos);

    // 생성
    const record = await createRecord({
      groupId,
      participantId: participant.id,
      exercise: ex as 'run' | 'bike' | 'swim', // 프론트 값 그대로
      description: description ?? null,
      seconds: verifiedSeconds,
      distanceKm: distanceKm == null ? null : Number(distanceKm),
      photos: photoUrls,
    });

    res.status(201).json({ ok: true, record });
  } catch (e) {
    next(e);
  }
};


