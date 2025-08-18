import { z } from 'zod';

export const CreateGroupSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string(),
    photoUrl: z.string().url().optional(),
    goalRep: z.number().default(0),
    discordWebhookUrl: z.string().url(),
    discordInviteUrl: z.string().url(),
    tags: z.array(z.string()).optional(),
    nickname: z.string().min(2),
    password: z.string().min(6),
  }),
});
export type CreateGroupRequest = z.infer<typeof CreateGroupSchema>['body'];
