// 테스트 환경 설정
import { beforeAll, afterAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  // 테스트 환경 설정
  process.env.NODE_ENV = 'test';
  
  // 데이터베이스 연결 확인
  await prisma.$connect();
});

afterAll(async () => {
  // 데이터베이스 연결 해제
  await prisma.$disconnect();
});