import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../index';
import { PrismaClient } from '@prisma/client';
import { describe, it, beforeAll, afterAll, expect, vi } from 'vitest';

const prisma = new PrismaClient();

// ✅ 디스코드 웹훅 모킹 (실제 호출 방지)
vi.mock('../src/utils/discord', () => ({
  sendDiscordWebhook: vi.fn(async () => {}),
}));

describe('운동 기록 등록 플로우 (소문자 enum)', () => {
  let groupId: number;
  const nickname = 'testuser';
  const password = 'pw1234';

  beforeAll(async () => {
    process.env.NODE_ENV = 'test';

    // 깨끗한 상태 보장 (선택)
    await prisma.recordPhoto.deleteMany();
    await prisma.record.deleteMany();

    await prisma.group.updateMany({ data: { ownerParticipantId: null } });
    await prisma.group.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.badge.deleteMany();

    // 그룹 생성 (ownerParticipantId는 나중에 설정)
    const group = await prisma.group.create({
      data: {
        name: '테스트그룹',
        description: 'e2e',
        discordWebhookUrl: '',
        discordInviteUrl: '',
        likeCount: 0,
        goalRep: 0,
      },
    });

    const hashed = await bcrypt.hash(password, 10);
    const p = await prisma.participant.create({
      data: {
        groupId: group.id,
        nickname,
        password: hashed,
      },
    });

    await prisma.group.update({
      where: { id: group.id },
      data: { ownerParticipantId: p.id },
    });

    // 태그/배지(선택)
    const t1 = await prisma.tag.upsert({
      where: { name: '달리기' },
      update: {},
      create: { name: '달리기' },
    });
    const t2 = await prisma.tag.upsert({
      where: { name: '자전거' },
      update: {},
      create: { name: '자전거' },
    });
    const t3 = await prisma.tag.upsert({
      where: { name: '수영' },
      update: {},
      create: { name: '수영' },
    });
    const b1 = await prisma.badge.upsert({
      where: { type: 'LIKE_100' },
      update: {},
      create: { type: 'LIKE_100' },
    });
    const b2 = await prisma.badge.upsert({
      where: { type: 'PARTICIPATION_10' },
      update: {},
      create: { type: 'PARTICIPATION_10' },
    });
    const b3 = await prisma.badge.upsert({
      where: { type: 'RECORD_100' },
      update: {},
      create: { type: 'RECORD_100' },
    });

    await prisma.group.update({
      where: { id: group.id },
      data: {
        tags: { connect: [{ id: t1.id }, { id: t2.id }, { id: t3.id }] },
        badges: { connect: [{ id: b1.id }, { id: b2.id }, { id: b3.id }] },
      },
    });

    groupId = group.id;
  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.recordPhoto.deleteMany(),
      prisma.record.deleteMany(),
      prisma.group.updateMany({ data: { ownerParticipantId: null } }), // 🔑 FK 끊기
      prisma.group.deleteMany(), // Participant는 CASCADE로 함께 삭제
      prisma.tag.deleteMany(),
      prisma.badge.deleteMany(),
    ]);

    await prisma.$disconnect();
  });

  it('타이머 시작 → 종료 → 기록 등록 성공(run)', async () => {
    // 타이머 시작
    const start = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);

    const timerId = start.body.timerId as string;
    expect(typeof timerId).toBe('string');

    // 최소 1초 대기
    await new Promise((r) => setTimeout(r, 1200));

    // 타이머 종료
    const stop = await request(app)
      .post('/api/timer/stop')
      .send({ timerId })
      .expect(200);

    const seconds = stop.body.elapsedSeconds as number;
    expect(seconds).toBeGreaterThanOrEqual(1);

    // 기록 등록 (⚠️ exercise는 소문자)
    const rec = await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        description: 'e2e 러닝',
        seconds,
        distanceKm: 1.11,
        photos: ['https://cdn.example.com/p1.jpg'],
        timerId,
      })
      .expect(201);

    expect(rec.body.ok).toBe(true);
    expect(rec.body.record).toHaveProperty('id');
    expect(rec.body.record.exercise).toBe('run'); // 소문자 enum 반환
    expect(rec.body.record.photos?.length).toBe(1);
  });

  it('seconds 불일치 시 400', async () => {
    const start = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);
    const timerId = start.body.timerId as string;
    await new Promise((r) => setTimeout(r, 1000));
    const stop = await request(app)
      .post('/api/timer/stop')
      .send({ timerId })
      .expect(200);
    const seconds = stop.body.elapsedSeconds as number;

    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds: seconds + 1, // 불일치
        timerId,
      })
      .expect(400);
  });

  it('잘못된 운동 종류 시 400', async () => {
    const start = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);
    const timerId = start.body.timerId as string;
    await new Promise((r) => setTimeout(r, 1000));
    await request(app).post('/api/timer/stop').send({ timerId }).expect(200);

    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'walk', // 유효하지 않음
        seconds: 1,
        timerId,
      })
      .expect(400);
  });

  it('사진 4장 초과 시 400', async () => {
    const start = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);
    const timerId = start.body.timerId as string;
    await new Promise((r) => setTimeout(r, 1000));
    const stop = await request(app)
      .post('/api/timer/stop')
      .send({ timerId })
      .expect(200);
    const seconds = stop.body.elapsedSeconds as number;

    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds,
        photos: [
          'https://a/1.jpg',
          'https://a/2.jpg',
          'https://a/3.jpg',
          'https://a/4.jpg',
        ],
        timerId,
      })
      .expect(400);
  });
});
