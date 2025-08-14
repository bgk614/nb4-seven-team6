import { prisma } from '../config/db';
import { readStopped, consume } from '../utils/timer';
import { sendDiscordWebhook } from '../utils/discord';
// 사진 URL 검증 (최대 3장)
export function validatePhotos(photos) {
    if (photos == null)
        return [];
    if (!Array.isArray(photos)) {
        const err = new Error('photos must be an array of URLs');
        err.status = 400;
        throw err;
    }
    if (photos.length > 3) {
        const err = new Error('Up to 3 photos allowed');
        err.status = 400;
        throw err;
    }
    photos.forEach((u) => {
        if (typeof u !== 'string' || !/^https?:\/\//i.test(u)) {
            const err = new Error('photo url must be http(s) URL');
            err.status = 400;
            throw err;
        }
    });
    return photos;
}
// 서버 타이머 강제 적용
export function enforceTimer({ timerId, groupId, participantId, clientSeconds, }) {
    const t = readStopped(timerId);
    if (!t) {
        const err = new Error('Invalid or not-stopped timerId');
        err.status = 400;
        throw err;
    }
    if (t.groupId !== groupId || t.participantId !== participantId) {
        const err = new Error('Timer owner mismatch');
        err.status = 400;
        throw err;
    }
    if (clientSeconds !== t.elapsedSec) {
        const err = new Error('seconds must match server timer');
        err.status = 400;
        throw err;
    }
    consume(timerId); // 1회성
    return t.elapsedSec;
}
export async function createRecord(opts) {
    const record = await prisma.record.create({
        data: {
            groupId: opts.groupId,
            participantId: opts.participantId,
            exercise: opts.exercise, // enum 키가 이제 run|bike|swim
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
    if (group?.discordWebhookUrl) {
        const lines = [
            `**새 운동 기록 등록!**`,
            `그룹: ${group.name} (#${group.id})`,
            `닉네임: ${record.participant.nickname}`,
            `종목: ${record.exercise}`,
            `시간: ${Math.floor(record.seconds / 60)}분 ${record.seconds % 60}초`,
            ...(record.distanceKm != null
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
