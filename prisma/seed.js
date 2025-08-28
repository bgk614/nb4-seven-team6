// 배지 기본 데이터 시드 파일
import { PrismaClient, BadgeType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기본 배지 3종 생성 (이미 존재하면 무시)
  await prisma.badge.upsert({
    where: { type: BadgeType.PARTICIPATION_10 },
    update: {},
    create: { type: BadgeType.PARTICIPATION_10 },
  });

  await prisma.badge.upsert({
    where: { type: BadgeType.RECORD_100 },
    update: {},
    create: { type: BadgeType.RECORD_100 },
  });

  await prisma.badge.upsert({
    where: { type: BadgeType.LIKE_100 },
    update: {},
    create: { type: BadgeType.LIKE_100 },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
