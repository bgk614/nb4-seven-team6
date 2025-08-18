import { PrismaClient } from '@prisma/client';
import { UpdateGroupRequest, GroupResponse } from '../../models/group';
import { verifyOwner } from '../../utils/auth.util';
import { toGroupResponse } from '../../utils/mappers/group.mapper';

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

  const updatedGroup = await prisma.group.update({
    where: { id: groupId },
    data: {
      ...updateData,
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
    include: { tags: true },
  });

  return toGroupResponse(updatedGroup);
};
