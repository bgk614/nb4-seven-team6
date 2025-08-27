// 그룹 탈퇴 서비스
import { prisma } from '../../config/db.js';
import bcrypt from 'bcryptjs';

export async function leaveGroup(
  groupId: number,
  payload: { nickname: string; password: string },
): Promise<boolean> {
  const { nickname, password } = payload;

  if (!nickname || !password) {
    const error = new Error('nickname/password 필수') as any;
    error.status = 400;
    throw error;
  }

  return await prisma.$transaction(async (tx) => {
    // 참가자 조회 + 그룹 정보 포함
    const participant = await tx.participant.findUnique({
      where: { groupId_nickname: { groupId, nickname } },
      include: { group: { include: { participants: true } } },
    });

    if (!participant) {
      const error = new Error('참여자 없음') as any;
      error.status = 404;
      throw error;
    }

    // 비밀번호 검증
    const isValidPassword = await bcrypt.compare(
      password,
      participant.password,
    );
    if (!isValidPassword) {
      const error = new Error('비밀번호 불일치') as any;
      error.status = 401;
      throw error;
    }

    const group = participant.group;

    // 오너일 경우
    if (group.ownerParticipantId === participant.id) {
      if (group.participants.length === 1) {
        // 오너 혼자면 그룹 삭제
        await tx.group.delete({ where: { id: groupId } });
        return true;
      } else {
        // 다른 멤버에게 오너 넘기기 (예: 가장 오래된 멤버)
        const newOwner = group.participants.find(
          (p) => p.id !== participant.id,
        );
        if (!newOwner) {
          const error = new Error('새 오너 지정 실패') as any;
          error.status = 500;
          throw error;
        }

        // 그룹장 변경
        await tx.group.update({
          where: { id: groupId },
          data: { ownerParticipantId: newOwner.id },
        });

        // 본인 탈퇴
        await tx.participant.delete({
          where: { id: participant.id },
        });

        return true;
      }
    }

    // 일반 멤버일 경우
    await tx.participant.delete({
      where: { id: participant.id },
    });

    return true;
  });
}
