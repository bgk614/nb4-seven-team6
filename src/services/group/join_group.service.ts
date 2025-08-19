// 그룹 참여 서비스
import { prisma } from '../../config/db.js';
import bcrypt from 'bcryptjs';
import { evaluateAndAwardBadges } from './badge_evaluation.service.js';

// 그룹에 새 참가자 추가 (닉네임 중복 방지, 비밀번호 해싱)
export async function joinGroup(
  groupId: number,
  payload: { nickname: string; password: string },
): Promise<{ id: number; groupId: number; nickname: string; createdAt: Date }> {
  const { nickname, password } = payload;

  // 필수 필드 검증
  if (!nickname || !password) {
    const error = new Error('nickname/password 필수') as any;
    error.status = 400;
    throw error;
  }

  // 비밀번호 해싱
  const hashedPassword = await bcrypt.hash(password, 10);

  // 트랜잭션으로 참가자 생성과 배지 확인을 한번에 처리
  return await prisma.$transaction(async (tx) => {
    try {
      const participant = await tx.participant.create({
        data: {
          groupId,
          nickname,
          password: hashedPassword,
        },
        select: { id: true, groupId: true, nickname: true, createdAt: true },
      });

      // 참여자 10명 달성 시 배지 부여 확인
      await evaluateAndAwardBadges(groupId, tx);

      return participant;
    } catch (err: any) {
      // 닉네임 중복 오류 처리
      if (err.code === 'P2002') {
        const error = new Error('이미 사용 중인 닉네임입니다.') as any;
        error.status = 409;
        throw error;
      }
      throw err;
    }
  });
}
