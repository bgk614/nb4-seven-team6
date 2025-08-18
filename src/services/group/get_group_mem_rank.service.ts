import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// 그룹 내 랭킹 조회
// 기본값: 그룹에 가입한 지 오래된 순서대로 (createdAt asc)
export async function getGroupMemRankService(
  groupId: number,
  { order = 'asc', orderBy = 'createdAt' },
) {
  try {
    const members = await prisma.group.findMany({
      where: { id: groupId },
      select: {
        participants: {
          select: {
            id: true,
            nickname: true,
            //recordCount: true,
            //recordTime: true
          },
        },
      },
      orderBy: {
        [orderBy]: order,
      },
    });
    return members;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
