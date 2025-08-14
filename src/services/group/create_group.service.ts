// src/services/group/create_group.service.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateGroupParams {
  name: string;
  description: string;
  photoUrl?: string;
  goalRep: number; 
  discordWebhookUrl: string;
  discordInviteUrl: string;
  tags?: string[];
  ownerNickname: string;
  ownerPassword: string;
}

export const createGroupService = async (params: CreateGroupParams) => {
  const {
    name,
    description,
    photoUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    ownerNickname,
    ownerPassword,
  } = params;

  return prisma.$transaction(async (tx) => {
    const group = await tx.group.create({
      data: {
        name,
        description,
        photoUrl,
        goalRep,
        discordWebhookUrl,
        discordInviteUrl,
      },
    });

    const owner = await tx.participant.create({
      data: {
        groupId: group.id,
        nickname: ownerNickname,
        password: ownerPassword, 
      },
    });

    const updatedGroup = await tx.group.update({
      where: { id: group.id },
      data: { ownerParticipantId: owner.id },
    });
    
    return updatedGroup;
  });
};
