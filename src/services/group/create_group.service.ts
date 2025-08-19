import { PrismaClient } from '@prisma/client';
import { CreateGroupRequest } from '@/models/group/create_group.dto';
import { GroupResponse } from '@/models/group/group_response.dto';
import { hashPassword } from '@/utils/auth.util';

const prisma = new PrismaClient();

export const createGroupService = async (
  params: CreateGroupRequest,
): Promise<GroupResponse> => {
  const {
    name,
    description,
    photoUrl,
    goalRep,
    discordWebhookUrl,
    discordInviteUrl,
    nickname,
    password,
    tags,
  } = params;

  const hashedPassword = await hashPassword(password);

  return prisma.$transaction(async (tx) => {
    const group = await tx.group.create({
      data: {
        name,
        description: description ?? '',
        photoUrl: photoUrl ?? null,
        goalRep,
        discordWebhookUrl,
        discordInviteUrl,
        participants: {
          create: {
            nickname: nickname,
            password: hashedPassword,
          },
        },
        tags: tags
          ? {
              connectOrCreate: tags.map((t) => ({
                where: { name: t },
                create: { name: t },
              })),
            }
          : undefined,
      },
      include: { participants: true, tags: true },
    });

    const updatedGroup = await tx.group.update({
      where: { id: group.id },
      data: { ownerParticipantId: group.participants[0].id },
      include: { participants: true, tags: true },
    });

    return updatedGroup as unknown as GroupResponse;
  });
};
