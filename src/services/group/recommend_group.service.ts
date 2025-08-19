// 그룹 추천수 증가 서비스
import { prisma } from '../../config/db.js';
import { evaluateAndAwardBadges } from './badge_evaluation.service.js';

// 그룹 추천수를 1 증가시키고 배지 조건 확인
export async function recommendGroup(
  groupId: number,
): Promise<{ id: number; likeCount: number }> {
  return await prisma.$transaction(async (tx) => {
    const group = await tx.group.update({
      where: { id: groupId },
      data: { likeCount: { increment: 1 } },
      select: { id: true, likeCount: true },
    });

    // 추천수 100회 달성 시 배지 부여 확인
    await evaluateAndAwardBadges(groupId, tx);
    return group;
  });
}
