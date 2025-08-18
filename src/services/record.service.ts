// src/services/record.service.ts

import { prisma } from '../config/db';
import { readStopped, consume } from '../utils/timer';
import { sendDiscordWebhook } from '../utils/discord';

export function validateExercise(v: string) {
  const allowed = ['run', 'bike', 'swim'];
  if (!allowed.includes(v)) {
    const err = new Error('Invalid exercise type');
    (err as any).status = 400;
    throw err;
  }
  return v as 'run' | 'bike' | 'swim';
}

export function validatePhotos(photos: unknown) {
  if (photos == null) return [] as string[];
  if (!Array.isArray(photos)) {
    const err = new Error('photos must be an array of URLs');
    (err as any).status = 400;
    throw err;
  }
  if (photos.length > 3) {
    const err = new Error('Up to 3 photos allowed');
    (err as any).status = 400;
    throw err;
  }
  photos.forEach((u) => {
    if (typeof u !== 'string' || !/^https?:\/\//i.test(u)) {
      const err = new Error('photo url must be http(s) URL');
      (err as any).status = 400;
      throw err;
    }
  });
  return photos as string[];
}

export function enforceTimer({
  timerId,
  groupId,
  participantId,
  clientSeconds,
}: {
  timerId: string;
  groupId: number;
  participantId: number;
  clientSeconds: number;
}) {
  const t = readStopped(timerId);
  if (!t) {
    const err = new Error('Invalid or not-stopped timerId');
    (err as any).status = 400;
    throw err;
  }
  if (t.groupId !== groupId || t.participantId !== participantId) {
    const err = new Error('Timer owner mismatch');
    (err as any).status = 400;
    throw err;
  }
  if (clientSeconds !== t.elapsedSec) {
    const err = new Error('seconds must match server timer');
    (err as any).status = 400;
    throw err;
  }
  consume(timerId);
  return t.elapsedSec!;
}

export async function createRecord(opts: {
  groupId: number;
  participantId: number;
  exercise: 'run' | 'bike' | 'swim';
  description?: string | null;
  seconds: number;
  distanceKm?: number | null;
  photos: string[];
}) {
  const record = await prisma.record.create({
    data: {
      groupId: opts.groupId,
      participantId: opts.participantId,
      exercise: opts.exercise as any, // Prisma enum(키) RUN/BIKE/SWIM에 @map돼서 DB에는 'run'/'bike'/'swim'
      description: opts.description ?? null,
      seconds: opts.seconds,
      distanceKm: opts.distanceKm ?? null,
      photos: opts.photos.length
        ? { create: opts.photos.map((url) => ({ url })) }
        : undefined,
    },
    include: {
      participant: { select: { id: true, nickname: true } },
      photos: true,
    },
  });

  // 디스코드 알림
  const group = await prisma.group.findUnique({ where: { id: opts.groupId } });
  if (group?.discordWebhookUrl) {
    const lines = [
      `**새 운동 기록 등록!**`,
      `그룹: ${group.name} (#${group.id})`,
      `닉네임: ${record.participant.nickname}`,
      `종목: ${opts.exercise}`,
      `시간: ${Math.floor(record.seconds / 60)}분 ${record.seconds % 60}초`,
      ...(record.distanceKm
        ? [`거리: ${record.distanceKm.toFixed(2)} km`]
        : []),
      ...(record.description ? [`설명: ${record.description}`] : []),
      ...(record.photos?.length ? [`사진 수: ${record.photos.length}`] : []),
    ];
    await sendDiscordWebhook(group.discordWebhookUrl, {
      content: lines.join('\n'),
    });
  }

  return record;
}
