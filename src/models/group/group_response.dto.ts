export interface GroupResponse {
  id: number;
  name: string;
  description?: string;
  photoUrl?: string;
  goalRep: number;
  discordWebhookUrl: string;
  discordInviteUrl: string;
  likeCount: number;
  ownerParticipantId?: number;
  createdAt: Date;
  updatedAt: Date;
}
