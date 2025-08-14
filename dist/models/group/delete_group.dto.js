import { z } from 'zod';
export const DeleteGroupParams = z.object({
    groupId: z
        .string()
        .regex(/^\d+$/, 'groupId must be a number')
        .transform(Number),
});
