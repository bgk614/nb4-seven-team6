import { Group } from '@prisma/client';
import { GroupResponse } from '../../models/group/group_response.dto.js';

export const toGroupResponse = (
  group: Group & {
    tags: { name: string }[];
    badges: { type: string }[];
    participants: {
      id: number;
      nickname: string;
      createdAt: Date;
      updatedAt: Date;
    }[];
  },
): GroupResponse => {
  const owner = group.participants.find(
    (p) => p.id === group.ownerParticipantId,
  );

  return {
    id: group.id,
    name: group.name,
    description: group.description ?? undefined,
    photoUrl: group.photoUrl ?? undefined,
    goalRep: group.goalRep,
    discordWebhookUrl: group.discordWebhookUrl,
    discordInviteUrl: group.discordInviteUrl,
    likeCount: group.likeCount,
    ownerParticipantId: group.ownerParticipantId ?? undefined,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
    tags: group.tags.map((t) => t.name),
    owner: owner ? { id: owner.id, nickname: owner.nickname } : undefined,
    badges: group.badges?.map((b) => b.type) ?? [],
    participants: group.participants.map((p) => ({
      id: p.id,
      nickname: p.nickname,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    })),
  };
};
