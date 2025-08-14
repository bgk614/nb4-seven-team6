export const toGroupResponse = (group) => ({
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
