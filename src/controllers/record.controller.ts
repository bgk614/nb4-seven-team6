// src/controllers/record.controller.ts
import { prisma } from '../config/db.js';
import { verifyPassword } from '../utils/password.js';
import {
  createRecord,
  validatePhotos,
  enforceTimer,
} from '../services/record.service.js'; // ✅ validateExercise 제거

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

// 그룹별 운동 기록 목록 조회
export const getAllRecords = async (req: any, res: any, next: any) => {
  try {
    const groupId = Number(req.params.groupId);

    // groupId 유효성 검사
    if (isNaN(groupId) || groupId <= 0) {
      throw Object.assign(new Error('Invalid group ID'), { status: 400 });
    }

    // 페이지네이션 매개변수 검증
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if (isNaN(page) || page < 1) {
      throw Object.assign(new Error('Page must be a positive number'), {
        status: 400,
      });
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      throw Object.assign(new Error('Limit must be between 1 and 100'), {
        status: 400,
      });
    }

    const skip = (page - 1) * limit;

    // 정렬 매개변수 검증
    const sortBy = req.query.sortBy || 'createdAt';
    const validSortFields = ['createdAt', 'seconds', 'distanceKm', 'exercise'];

    if (!validSortFields.includes(sortBy)) {
      throw Object.assign(
        new Error(
          `Invalid sort field. Must be one of: ${validSortFields.join(', ')}`,
        ),
        { status: 400 },
      );
    }
    const sortOrder =
      req.query.sortOrder?.toLowerCase() === 'asc' ? 'asc' : 'desc';

    // 그룹 존재 확인
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      throw Object.assign(new Error('Group not found'), { status: 404 });
    }

    // 페이지네이션 및 정렬 적용
    try {
      const [records, total] = await Promise.all([
        prisma.record.findMany({
          where: { groupId },
          include: {
            participant: {
              select: { id: true, nickname: true },
            },
            photos: {
              select: { url: true },
            },
          },
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: limit,
        }),
        prisma.record.count({
          where: { groupId },
        }),
      ]);

      // 응답 포맷팅
      const formattedRecords = records.map((record) => ({
        ...record,
        photos: record.photos.map((photo) => photo.url),
      }));

      res.status(200).json({
        records: formattedRecords,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw Object.assign(new Error('Failed to fetch records'), {
        status: 500,
      });
    }
  } catch (e) {
    next(e);
  }
};

// 그룹별 운동 기록 상세 조회
export const getRecordById = async (req: any, res: any, next: any) => {
  try {
    const groupId = Number(req.params.groupId);
    const recordId = Number(req.params.recordId);

    // ID 유효성 검사
    if (isNaN(groupId) || groupId <= 0) {
      throw Object.assign(new Error('Invalid group ID'), { status: 400 });
    }

    if (isNaN(recordId) || recordId <= 0) {
      throw Object.assign(new Error('Invalid record ID'), { status: 400 });
    }

    // 그룹 존재 확인
    const groupExists = await prisma.group.findUnique({
      where: { id: groupId },
      select: { id: true },
    });

    if (!groupExists) {
      throw Object.assign(new Error('Group not found'), { status: 404 });
    }

    try {
      // 해당 그룹에 속한 레코드 조회
      const record = await prisma.record.findFirst({
        where: {
          id: recordId,
          groupId,
        },
        include: {
          participant: {
            select: { id: true, nickname: true },
          },
          photos: {
            select: { url: true },
          },
        },
      });

      if (!record) {
        throw Object.assign(new Error('Record not found in this group'), {
          status: 404,
        });
      }

      // 응답 포맷팅
      const formattedRecord = {
        ...record,
        photos: record.photos.map((photo) => photo.url),
      };

      res.status(200).json(formattedRecord);
    } catch (dbError) {
      console.error('Database error:', dbError);
      throw Object.assign(new Error('Failed to fetch record details'), {
        status: 500,
      });
    }
  } catch (e) {
    next(e);
  }
};
