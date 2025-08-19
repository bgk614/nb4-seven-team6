import { PrismaClient } from '@prisma/client';
import { DeleteGroupResponse } from '../../models/group';
import { verifyOwner } from '../../utils/auth.util';

const prisma = new PrismaClient();

export const deleteGroupService = async (
  groupId: number,
  nickname: string,
  password: string,
): Promise<DeleteGroupResponse> => {
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

  await prisma.group.delete({ where: { id: groupId } });

  return {
    success: true,
    deletedId: groupId,
  };
};
