// src/services/group/create_group.service.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

interface CreateGroupParams {
  name: string;
  description: string;
  photoUrl?: string;
  goalReq: number; // ← 들어오는 이름은 goalReq
  discordWebhookUrl: string;
  discordInviteUrl: string;
  tags?: string[]; // ← 지금은 생략 처리(다대다면 connectOrCreate 필요)
  ownerNickname: string;
  ownerPassword: string;
}

export const createGroupService = async (params: CreateGroupParams) => {
  const {
    name,
    description,
    photoUrl,
    goalReq,
    discordWebhookUrl,
    discordInviteUrl,
    ownerNickname,
    ownerPassword,
    // tags
  } = params;

  return prisma.$transaction(async (tx) => {
    // 1) 그룹 먼저 생성 (오너는 아직 비움)
    const group = await tx.group.create({
      data: {
        name,
        description,
        photoUrl,
        goalRep: goalReq, // ← 스키마 필드명에 맞춰 저장
        discordWebhookUrl,
        discordInviteUrl,
      },
    });

    // 2) 오너 참가자 생성 (이제 groupId 참조 가능)
    const owner = await tx.participant.create({
      data: {
        groupId: group.id,
        nickname: ownerNickname,
        password: ownerPassword, // 실제로는 해시 필요
      },
    });

    // 3) 그룹에 오너 연결
    const updatedGroup = await tx.group.update({
      where: { id: group.id },
      data: { ownerParticipantId: owner.id },
    });

    // (옵션) 태그 연결: 다대다면 connectOrCreate로 처리해야 함. 지금은 생략.

    return updatedGroup;
  });
};
