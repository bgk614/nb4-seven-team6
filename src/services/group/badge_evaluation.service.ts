// 배지 평가 및 부여 서비스
import { Prisma } from '@prisma/client';
import { BadgeType } from '../../generated/prisma/index.js';

// 그룹의 현재 상태를 확인하여 조건 달성 시 배지 부여
export async function evaluateAndAwardBadges(
  groupId: number,
  tx: Prisma.TransactionClient,
): Promise<void> {
  // 그룹 현황을 1회 쿼리로 조회 (참여자수, 기록수, 추천수, 보유배지)
  const group = await tx.group.findUnique({
    where: { id: groupId },
    select: {
      likeCount: true,
      _count: {
        select: {
          participants: true,
          records: true,
        },
      },
      badges: {
        select: { type: true },
      },
    },
  });

  if (!group) return;

  // 이미 보유한 배지 목록
  const existingBadges = new Set(group.badges.map((b) => b.type));
  const badgesToAward: BadgeType[] = [];

  // 참여자 10명 달성 배지 확인
  if (
    group._count.participants >= 10 &&
    !existingBadges.has(BadgeType.PARTICIPATION_10)
  ) {
    badgesToAward.push(BadgeType.PARTICIPATION_10);
  }

  // 기록 100개 달성 배지 확인
  if (
    group._count.records >= 100 &&
    !existingBadges.has(BadgeType.RECORD_100)
  ) {
    badgesToAward.push(BadgeType.RECORD_100);
  }

  // 추천 100회 달성 배지 확인
  if (group.likeCount >= 100 && !existingBadges.has(BadgeType.LIKE_100)) {
    badgesToAward.push(BadgeType.LIKE_100);
  }

  // 새로 획득한 배지들을 그룹에 연결
  for (const badgeType of badgesToAward) {
    const badge = await tx.badge.findUnique({ where: { type: badgeType } });
    if (badge) {
      await tx.group.update({
        where: { id: groupId },
        data: {
          badges: {
            connect: { id: badge.id },
          },
        },
      });
    }
  }
}
