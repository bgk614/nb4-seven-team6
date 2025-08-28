import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';
import app from '../app.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('API Integration Tests', () => {
  let createdGroupId: number;
  let createdRecordId: number;

  beforeAll(async () => {
    // 테스트 데이터 정리
    await prisma.recordPhoto.deleteMany();
    await prisma.record.deleteMany();
    await prisma.group.updateMany({ data: { ownerParticipantId: null } });
    await prisma.participant.deleteMany();
    await prisma.group.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.badge.deleteMany();
  });

  afterAll(async () => {
    // 테스트 데이터 정리
    await prisma.recordPhoto.deleteMany();
    await prisma.record.deleteMany();
    await prisma.group.updateMany({ data: { ownerParticipantId: null } });
    await prisma.participant.deleteMany();
    await prisma.group.deleteMany();
    await prisma.tag.deleteMany();
    await prisma.badge.deleteMany();
    await prisma.$disconnect();
  });

  describe('Group APIs', () => {
    it('POST /groups - 그룹 생성', async () => {
      const groupData = {
        name: '테스트 그룹',
        description: '테스트용 그룹입니다',
        photoUrl: 'https://example.com/test.jpg',
        goalRep: 10,
        discordWebhookUrl: 'https://discord.com/api/webhooks/123/abc',
        discordInviteUrl: 'https://discord.gg/test',
        tags: ['러닝', '테스트'],
        nickname: '테스터',
        password: '123456'
      };

      const response = await request(app)
        .post('/groups')
        .send(groupData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(groupData.name);
      expect(response.body.description).toBe(groupData.description);
      expect(response.body.tags).toContain('러닝');
      expect(response.body.tags).toContain('테스트');

      createdGroupId = response.body.id;
    });

    it('GET /groups - 그룹 목록 조회', async () => {
      const response = await request(app)
        .get('/groups')
        .query({
          page: 1,
          limit: 10,
          order: 'desc',
          orderBy: 'createdAt'
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.total).toBeGreaterThan(0);
    });

    it('GET /groups/:id - 그룹 상세 조회', async () => {
      const response = await request(app)
        .get(`/groups/${createdGroupId}`)
        .expect(200);

      expect(response.body.id).toBe(createdGroupId);
      expect(response.body.name).toBe('테스트 그룹');
      expect(response.body).toHaveProperty('participants');
      expect(response.body).toHaveProperty('tags');
    });

    it('PATCH /groups/:id - 그룹 수정', async () => {
      const updateData = {
        name: '수정된 테스트 그룹',
        description: '수정된 설명',
        nickname: '테스터',
        password: '123456'
      };

      const response = await request(app)
        .patch(`/groups/${createdGroupId}`)
        .send(updateData)
        .expect(200);

      expect(response.body.name).toBe(updateData.name);
      expect(response.body.description).toBe(updateData.description);
    });

    it('POST /groups/:id/participants - 그룹 참여', async () => {
      const joinData = {
        nickname: '새참가자',
        password: '123456'
      };

      const response = await request(app)
        .post(`/groups/${createdGroupId}/participants`)
        .send(joinData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
    });

    it('DELETE /groups/:id/participants - 그룹 탈퇴', async () => {
      const leaveData = {
        nickname: '새참가자',
        password: '123456'
      };

      const response = await request(app)
        .delete(`/groups/${createdGroupId}/participants`)
        .send(leaveData)
        .expect(200);

      expect(response.body).toHaveProperty('left');
      expect(response.body.left).toBe(true);
    });

    it('POST /groups/:id/likes - 그룹 좋아요', async () => {
      const response = await request(app)
        .post(`/groups/${createdGroupId}/likes`)
        .expect(200);

      expect(response.body).toHaveProperty('likeCount');
    });

    it('DELETE /groups/:id/likes - 그룹 좋아요 취소', async () => {
      const response = await request(app)
        .delete(`/groups/${createdGroupId}/likes`)
        .expect(200);

      expect(response.body).toHaveProperty('likeCount');
    });
  });

  describe('Record APIs', () => {
    it('POST /groups/:id/records - 운동 기록 생성', async () => {
      const recordData = {
        authorNickname: '테스터',
        authorPassword: '123456',
        exerciseType: 'run',
        description: '테스트 러닝',
        time: 3600,
        distance: 5.5,
        photos: ['https://example.com/test.jpg']
      };

      const response = await request(app)
        .post(`/groups/${createdGroupId}/records`)
        .send(recordData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.exerciseType).toBe('run');
      expect(response.body.description).toBe('테스트 러닝');
      expect(response.body.time).toBe(3600);
      expect(response.body.distance).toBe(5.5);
      expect(response.body.photos).toContain('https://example.com/test.jpg');

      createdRecordId = response.body.id;
    });

    it('GET /groups/:id/records - 운동 기록 목록 조회', async () => {
      const response = await request(app)
        .get(`/groups/${createdGroupId}/records`)
        .query({
          page: 1,
          limit: 10
        })
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.total).toBeGreaterThan(0);
      expect(response.body.data[0]).toHaveProperty('exerciseType');
      expect(response.body.data[0]).toHaveProperty('author');
    });

    it('GET /groups/:id/records/:recordId - 운동 기록 상세 조회', async () => {
      const response = await request(app)
        .get(`/groups/${createdGroupId}/records/${createdRecordId}`)
        .expect(200);

      expect(response.body.id).toBe(createdRecordId);
      expect(response.body).toHaveProperty('exercise');
      expect(response.body).toHaveProperty('participant');
    });

    it('GET /groups/:id/rank - 그룹 랭킹 조회', async () => {
      const response = await request(app)
        .get(`/groups/${createdGroupId}/rank`)
        .query({ duration: 'weekly' })
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      if (response.body.length > 0) {
        expect(response.body[0]).toHaveProperty('participantId');
        expect(response.body[0]).toHaveProperty('nickname');
        expect(response.body[0]).toHaveProperty('recordCount');
        expect(response.body[0]).toHaveProperty('recordTime');
      }
    });
  });

  describe('Upload API', () => {
    it('POST /uploads - 이미지 업로드 (모의)', async () => {
      // 실제 파일 업로드 테스트는 복잡하므로 간단히 엔드포인트 존재 확인
      await request(app)
        .post('/uploads')
        .expect(400); // 파일 없이 호출하면 400 에러

      // 400 에러가 나는 것은 정상 (파일이 필요하다는 의미)
    });
  });

  describe('Error Cases', () => {
    it('POST /groups - 잘못된 데이터로 그룹 생성 실패', async () => {
      const invalidData = {
        name: '', // 빈 이름
        description: '',
        nickname: 'test',
        password: '123' // 너무 짧은 비밀번호
      };

      const response = await request(app)
        .post('/groups')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.status).toBe(400);
    });

    it('POST /groups/:id/records - 그룹에 가입되지 않은 사용자', async () => {
      const recordData = {
        authorNickname: '존재하지않는사용자',
        authorPassword: '잘못된비밀번호',
        exerciseType: 'run',
        description: '테스트',
        time: 1800,
        distance: 3.0
      };

      const response = await request(app)
        .post(`/groups/${createdGroupId}/records`)
        .send(recordData)
        .expect(401);

      expect(response.body.message).toBe('그룹에 가입되어있지않는 유저입니다.');
    });

    it('GET /groups/99999 - 존재하지 않는 그룹', async () => {
      await request(app)
        .get('/groups/99999')
        .expect(404);
    });

    it('POST /groups/:id/records - 잘못된 운동 타입', async () => {
      const recordData = {
        authorNickname: '테스터',
        authorPassword: '123456',
        exerciseType: 'invalid_exercise',
        description: '테스트',
        time: 1800,
        distance: 3.0
      };

      const response = await request(app)
        .post(`/groups/${createdGroupId}/records`)
        .send(recordData)
        .expect(400);

      expect(response.body.message).toBe('Invalid exercise type');
    });
  });

  describe('Cleanup', () => {
    it('DELETE /groups/:id - 그룹 삭제', async () => {
      const deleteData = {
        nickname: '테스터',
        password: '123456'
      };

      const response = await request(app)
        .delete(`/groups/${createdGroupId}`)
        .send(deleteData)
        .expect(200);

      expect(response.body).toHaveProperty('success');
      expect(response.body).toHaveProperty('deletedId');
      expect(response.body.success).toBe(true);
      expect(response.body.deletedId).toBe(createdGroupId);
    });
  });
});