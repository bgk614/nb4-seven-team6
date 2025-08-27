// src/controllers/record.controller.ts
import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/db.js';
import { verifyPassword } from '../utils/password.js';
import {
  createRecord,
  validatePhotos,
  enforceTimer,
} from '../services/record.service.js';

export const registerRecord = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const groupId = Number(req.params.groupId);
    const {
      nickname,
      password,
      exerciseType,
      description,
      time,
      distance,
      photos,
      timerId,
    } = req.body ?? {};

    // 필수 필드 검증
    if (!groupId || !nickname || !password || !exerciseType || time == null) {
      throw Object.assign(new Error('Missing required fields'), {
        status: 400,
      });
    }

    // 그룹 내 닉네임/비번 검증
    const participant = await prisma.participant.findFirst({
      where: { groupId, nickname },
    });
    if (!participant) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    const ok = await verifyPassword(String(password), participant.password);
    if (!ok) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    // 운동 종류 검증
    if (!['run', 'bike', 'swim'].includes(exerciseType)) {
      throw Object.assign(new Error('Invalid exercise type'), {
        status: 400,
      });
    }

    // 타이머 검증
    let verifiedSeconds = Number(time);
    if (timerId) {
      // 서버 타이머를 사용한 경우 검증
      verifiedSeconds = enforceTimer({
        timerId: String(timerId),
        groupId,
        participantId: participant.id,
        clientSeconds: Number(time),
      });
    } else {
      // 직접 입력된 시간을 사용 (최소 1초)
      verifiedSeconds = Math.max(1, Number(time));
    }

    // 거리/사진 검증
    if (distance != null && Number(distance) < 0) {
      throw Object.assign(new Error('distance must be >= 0'), {
        status: 400,
      });
    }
    const photoUrls = validatePhotos(photos);

    // 생성
    const record = await createRecord({
      groupId,
      participantId: participant.id,
      exercise: exerciseType as 'run' | 'bike' | 'swim',
      description: description ?? null,
      seconds: verifiedSeconds,
      distanceKm: distance == null ? null : Number(distance),
      photos: photoUrls,
    });

    // 프론트엔드가 기대하는 형태로 응답
    const response = {
      id: record.id,
      exerciseType: record.exercise,
      description: record.description,
      time: record.seconds,
      distance: record.distanceKm,
      photos: record.photos?.map((p) => p.url) || [],
      author: {
        id: record.participant.id,
        nickname: record.participant.nickname,
      },
      createdAt: record.createdAt.getTime(),
      updatedAt: record.updatedAt.getTime(),
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

// 기록 조회 API
export const getRecords = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const groupId = Number(req.params.groupId);
    const {
      page = 1,
      limit = 6,
      order = 'desc',
      orderBy = 'createdAt',
      search = '',
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    // 검색 조건
    const where = { groupId } as Record<string, unknown>;
    if (search) {
      where.OR = [
        { description: { contains: search, mode: 'insensitive' } },
        {
          participant: {
            nickname: { contains: search, mode: 'insensitive' },
          },
        },
      ];
    }

    // 정렬 조건
    const orderByClause = {} as Record<string, string>;
    if (orderBy === 'createdAt') {
      orderByClause.createdAt = order as string;
    } else if (orderBy === 'time') {
      orderByClause.seconds = order as string;
    }

    const [records, total] = await Promise.all([
      prisma.record.findMany({
        where,
        include: {
          participant: { select: { id: true, nickname: true } },
          photos: { select: { url: true } },
        },
        orderBy: orderByClause,
        skip,
        take,
      }),
      prisma.record.count({ where }),
    ]);

    // 프론트엔드 형태로 변환
    const data = records.map((record) => ({
      id: record.id,
      exerciseType: record.exercise,
      description: record.description,
      time: record.seconds,
      distance: record.distanceKm,
      photos: record.photos.map((p) => p.url),
      author: {
        id: record.participant.id,
        nickname: record.participant.nickname,
      },
      createdAt: record.createdAt.getTime(),
      updatedAt: record.updatedAt.getTime(),
    }));

    res.json({ data, total });
  } catch (e) {
    next(e);
  }
};
