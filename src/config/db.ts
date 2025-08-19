// db.ts

import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

// 종료 시 연결 정리
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});
