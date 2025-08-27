import { PrismaClient } from '@prisma/client';
import { GroupResponse } from '@/models/group/group_response.dto.js';
import { toGroupResponse } from '@/utils/mappers/group.mapper.js';

const prisma = new PrismaClient();

// 그룹 상세 조회
export async function getGroupByIdService(
  groupId: number,
): Promise<GroupResponse | null> {
  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: {
      tags: { select: { name: true } },
      badges: true,
      participants: {
        select: {
          id: true,
          nickname: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  return group ? toGroupResponse(group) : null;
}
