import { Request, Response } from 'express';
import { createGroupService } from '../../services/group/create_group.service.js';

export const createGroupController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      photoUrl,
      goalReq,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      ownerNickname,
      ownerPassword,
    } = req.body;

    const group = await createGroupService({
      name,
      description,
      photoUrl,
      goalReq,
      discordWebhookUrl,
      discordInviteUrl,
      tags,
      ownerNickname,
      ownerPassword,
    });

    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '그룹 생성 실패' });
  }
};
