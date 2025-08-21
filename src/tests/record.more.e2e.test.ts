import request from 'supertest';
import app from '../index';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { describe, it, beforeAll, afterAll, expect, vi } from 'vitest';

const prisma = new PrismaClient();

vi.mock('../utils/discord', () => ({
  sendDiscordWebhook: vi.fn(async () => {}),
}));

describe('운동 기록 - 추가 엣지 케이스', () => {
  let groupId: number;
  const nickname = 'edgeuser';
  const password = 'pw1234';

  beforeAll(async () => {
    // 깨끗하게 정리 (FK 끊고 그룹 먼저 삭제)
    await prisma.$transaction([
      prisma.recordPhoto.deleteMany(),
      prisma.record.deleteMany(),
      prisma.group.updateMany({ data: { ownerParticipantId: null } }),
      prisma.group.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.badge.deleteMany(),
    ]);

    // 기본 데이터 구성
    const g = await prisma.group.create({
      data: {
        name: '엣지그룹',
        description: 'edge',
        discordWebhookUrl: '', // 알림 끔
        discordInviteUrl: '',
        likeCount: 0,
        goalRep: 0,
      },
    });
    groupId = g.id;

    const hashed = await bcrypt.hash(password, 10);
    const p = await prisma.participant.create({
      data: { groupId, nickname, password: hashed },
    });

    await prisma.group.update({
      where: { id: groupId },
      data: { ownerParticipantId: p.id },
    });
  });

  afterAll(async () => {
    await prisma.$transaction([
      prisma.recordPhoto.deleteMany(),
      prisma.record.deleteMany(),
      prisma.group.updateMany({ data: { ownerParticipantId: null } }),
      prisma.group.deleteMany(),
      prisma.tag.deleteMany(),
      prisma.badge.deleteMany(),
    ]);
    await prisma.$disconnect();
  });

  it('잘못된 비밀번호 → 401', async () => {
    const start = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password: 'wrong' })
      .expect(401);
    expect(start.body.ok).toBe(false);
  });

  it('그룹에 없는 닉네임 → 401', async () => {
    const start = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname: 'unknown', password })
      .expect(401);
    expect(start.body.ok).toBe(false);
  });

  it('타이머 재사용 → 400', async () => {
    const s = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);
    const timerId = s.body.timerId as string;
    await new Promise((r) => setTimeout(r, 1000));
    const stop = await request(app)
      .post('/api/timer/stop')
      .send({ timerId })
      .expect(200);
    const seconds = stop.body.elapsedSeconds as number;

    // 첫 사용(성공)
    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds,
        timerId,
      })
      .expect(201);

    // 같은 timerId 재사용(실패)
    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds,
        timerId,
      })
      .expect(400);
  });

  it('사진 URL 형식 오류 / 배열 아님 / 음수 거리 → 400', async () => {
    // 타이머 준비
    const s = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);
    const timerId = s.body.timerId as string;
    await new Promise((r) => setTimeout(r, 1000));
    const stop = await request(app)
      .post('/api/timer/stop')
      .send({ timerId })
      .expect(200);
    const seconds = stop.body.elapsedSeconds as number;

    // 배열 아님
    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds,
        timerId,
        photos: 'http://x/1.jpg',
      })
      .expect(400);

    // http(s) 아님
    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds,
        timerId,
        photos: ['ftp://x/1.jpg'],
      })
      .expect(400);

    // 음수 거리
    await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'run',
        seconds,
        timerId,
        distanceKm: -1,
      })
      .expect(400);
  });

  it('대문자 exercise도 허용 → 소문자로 저장', async () => {
    // 타이머 준비
    const s = await request(app)
      .post('/api/timer/start')
      .send({ groupId, nickname, password })
      .expect(201);
    const timerId = s.body.timerId as string;
    await new Promise((r) => setTimeout(r, 1000));
    const stop = await request(app)
      .post('/api/timer/stop')
      .send({ timerId })
      .expect(200);
    const seconds = stop.body.elapsedSeconds as number;

    const res = await request(app)
      .post(`/api/groups/${groupId}/records`)
      .send({
        nickname,
        password,
        exercise: 'RUN',
        seconds,
        timerId,
      })
      .expect(201);

    expect(res.body.ok).toBe(true);
    expect(res.body.record.exercise).toBe('run'); // 컨트롤러에서 toLowerCase 처리 가정
  });
});
