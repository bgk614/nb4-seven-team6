import { Group } from '@prisma/client';
import { GroupResponse } from '../../models/group';

export const toGroupResponse = (group: Group): GroupResponse => ({
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
});
