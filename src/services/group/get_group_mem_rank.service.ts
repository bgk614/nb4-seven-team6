import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// 그룹 내 랭킹 조회
export async function getGroupMemRankService(
  groupId: number,
  order: 'asc' | 'desc',
  duration: 'weekly' | 'monthly',
) {
  try {
    // 기간 계산
    const now = new Date();
    let startDate: Date;
    let endDate: Date;
    if (duration == 'weekly') {
      // 구간을 [이번 주 월요일 0시, 다음 주 월요일 0시)로 설정
      const day = now.getDay() || 7;
      startDate = new Date(now);
      startDate.setDate(now.getDate() - day + 1); // 시작을 월요일로 설정
      startDate.setHours(0, 0, 0, 0); // 월요일 0시

      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7); // 7일 뒤
    } else {
      // 구간을 [이번 달 1일 0시, 다음 달 1일 0시)로 설정
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    }
    const ranks = await prisma.record.groupBy({
      by: ['participantId'],
      where: {
        groupId: groupId,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      _count: {
        id: true, // 기록 개수
      },
      _sum: {
        seconds: true, // 기록 시간의 합
      },
      orderBy: {
        _sum: { seconds: order },
      },
    });
    const result = await Promise.all(
      ranks.map(async (r) => {
        const member = await prisma.participant.findUnique({
          where: { id: r.participantId },
          select: { nickname: true },
        });
        return {
          participantId: r.participantId,
          nickname: member?.nickname,
          recordCount: r._count.id,
          recordTime: r._sum.seconds,
        };
      }),
    );
    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
