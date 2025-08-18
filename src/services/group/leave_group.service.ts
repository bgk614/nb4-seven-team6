// 그룹 탈퇴 서비스
import { prisma } from '../../config/db.js';
import bcrypt from 'bcryptjs';

// 그룹에서 참가자 제거 (비밀번호 검증 후 관련 기록도 함께 삭제)
export async function leaveGroup(
  groupId: number,
  payload: { nickname: string; password: string },
): Promise<boolean> {
  const { nickname, password } = payload;

  // 필수 필드 검증
  if (!nickname || !password) {
    const error = new Error('nickname/password 필수') as any;
    error.status = 400;
    throw error;
  }

  // 트랜잭션으로 순서 보장 (기록을 먼저 삭제한 후 참가자 삭제)
  return await prisma.$transaction(async (tx) => {
    // 참가자 존재 확인
    const participant = await tx.participant.findUnique({
      where: { groupId_nickname: { groupId, nickname } },
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

    // 참가자 삭제
    await tx.participant.delete({
      where: { id: participant.id },
    });

    return true;
  });
}
