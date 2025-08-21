import { z } from 'zod';

export const UpdateGroupParams = z.object({
  groupId: z
    .string()
    .regex(/^\d+$/, 'groupId must be a number') // 숫자만 허용
    .transform(Number),
});

export type UpdateGroupParamsType = z.infer<typeof UpdateGroupParams>;

export const UpdateGroupSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    photoUrl: z.string().url().optional(),
    discordWebhookUrl: z.string().url().optional(),
    discordInviteUrl: z.string().url().optional(),
    goalRep: z.number().min(1),
    nickname: z.string().min(1),
    password: z.string().min(1),
    tags: z.array(z.string()).optional(),
  }),
});
export type UpdateGroupRequest = z.infer<typeof UpdateGroupSchema>['body'];
