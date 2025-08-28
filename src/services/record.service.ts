import { prisma } from '../config/db.js';
import { readStopped, consume } from '../utils/timer.js';
import { sendDiscordWebhook } from '../utils/discord.js';

// 사진 URL 검증 (최대 3장)
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

// 서버 타이머 강제 적용
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
  consume(timerId); // 1회성
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
      exercise: opts.exercise as any, // enum 키가 이제 run|bike|swim
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

  const group = await prisma.group.findUnique({ where: { id: opts.groupId } });
  if (
    group?.discordWebhookUrl &&
    group.discordWebhookUrl.startsWith('https://discord.com/api/webhooks/')
  ) {
    try {
      // 운동 종류별 이모지
      const exerciseEmoji = {
        run: '🏃‍♂️',
        bike: '🚴‍♀️',
        swim: '🏊‍♀️'
      }[record.exercise] || '💪';

      // 운동 종류 한글명
      const exerciseKorean = {
        run: '러닝',
        bike: '사이클링',
        swim: '수영'
      }[record.exercise] || record.exercise;

      // 시간 포맷팅
      const timeFormatted = `${Math.floor(record.seconds / 60)}분 ${record.seconds % 60}초`;
      
      // Embed 메시지로 전송
      const embedMessage = {
        embeds: [{
          title: `${exerciseEmoji} 새로운 운동 기록이 등록되었습니다!`,
          description: `**${group.name}** 그룹에 새로운 기록이 추가되었습니다.`,
          color: 0x00ff00, // 초록색
          fields: [
            { name: '👤 참가자', value: record.participant.nickname, inline: true },
            { name: '🏃 운동 종류', value: exerciseKorean, inline: true },
            { name: '⏱️ 운동 시간', value: `${timeFormatted} (${record.seconds}초)`, inline: true },
            ...(record.distanceKm != null ? [
              { name: '📍 거리', value: `${record.distanceKm.toFixed(2)} km`, inline: true }
            ] : []),
            ...(record.description ? [
              { name: '📝 설명', value: record.description, inline: false }
            ] : []),
            ...(record.photos?.length ? [
              { name: '📸 사진', value: `${record.photos.length}장의 사진이 업로드되었습니다`, inline: true }
            ] : [])
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: `그룹 ID: ${group.id} | 기록 ID: ${record.id}`,
            icon_url: group.photoUrl || undefined
          }
        }]
      };

      await sendDiscordWebhook(group.discordWebhookUrl, embedMessage);
    } catch (error) {
      // Discord 웹훅 실패는 기록 생성을 방해하지 않음
      console.warn('Discord webhook failed:', error);
    }
  }

  return record;
}
