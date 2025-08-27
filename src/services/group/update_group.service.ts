import { PrismaClient } from '@prisma/client';
import { UpdateGroupRequest } from '../../models/group/update_group.dto.js';
import { GroupResponse } from '../../models/group/group_response.dto.js';
import { verifyOwner } from '../../utils/auth.util.js';
import { toGroupResponse } from '../../utils/mappers/group.mapper.js';

const prisma = new PrismaClient();

export const updateGroupService = async (
  groupId: number,
  params: UpdateGroupRequest,
): Promise<GroupResponse> => {
  const { nickname, password, tags, ...updateData } = params;

  const group = await prisma.group.findUnique({
    where: { id: groupId },
    include: { participants: true },
  });
  if (!group) throw new Error('그룹 없음');

  const owner = group.participants.find(
    (p) => p.id === group.ownerParticipantId,
  );
  if (!owner) throw new Error('오너 없음');

  const isOwner = await verifyOwner(nickname, password, owner);
  if (!isOwner) throw new Error('권한 없음');

  // undefined 필드 제거
  const cleanedData = Object.fromEntries(
    Object.entries(updateData).filter(([_, v]) => v !== undefined),
  );

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: {
      ...cleanedData,
      tags: tags
        ? {
            set: [],
            connectOrCreate: tags.map((t) => ({
              where: { name: t },
              create: { name: t },
            })),
          }
        : undefined,
    },
    include: {
      tags: true,
      participants: true,
      badges: true,
    },
  });

  return toGroupResponse(updatedGroup);
};
