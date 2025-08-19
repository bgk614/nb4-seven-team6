import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

// 그룹 상세 조회
export async function getGroupByIdService(groupId: number) {
  try {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: {
        tags: {
          select: { name: true },
        },
        owner: {
          select: {
            id: true,
            nickname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        participants: {
          select: {
            id: true,
            nickname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        badges: {
          select: {
            name: true,
          },
        },
      },
    });
    return group;
  } catch (e) {
    console.log(e);
    throw e;
  }
}
