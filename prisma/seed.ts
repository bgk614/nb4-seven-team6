// 배지 기본 데이터 시드 파일
import { PrismaClient, BadgeType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 기본 배지 3종 생성 (이미 존재하면 무시)
  await prisma.badge.upsert({
    where: { name: BadgeType.PARTICIPATION_10 },
    update: {},
    create: { name: BadgeType.PARTICIPATION_10, label: '참여자 10명 달성' },
  });

  await prisma.badge.upsert({
    where: { name: BadgeType.RECORD_100 },
    update: {},
    create: { name: BadgeType.RECORD_100, label: '운동 기록 100개 달성' },
  });

  await prisma.badge.upsert({
    where: { name: BadgeType.LIKE_100 },
    update: {},
    create: { name: BadgeType.LIKE_100, label: '추천수 100회 달성' },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
