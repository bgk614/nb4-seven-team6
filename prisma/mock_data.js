// prisma/mockData.js
import { PrismaClient, ExerciseType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // === 1. 그룹 생성 ===
  let group = await prisma.group.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: '그룹 배지 테스트',
      description: '배지 테스트용 그룹',
      goalRep: 100,
      discordWebhookUrl: 'https://test',
      discordInviteUrl: 'https://test',
      likeCount: 99,
    },
  });

  // === 2. 오너 생성 ===
  const owner = await prisma.participant.upsert({
    where: { groupId_nickname: { groupId: group.id, nickname: 'owner' } },
    update: {},
    create: {
      groupId: group.id,
      nickname: 'owner',
      password: 'owner123',
    },
  });

  // 그룹에 오너 연결
  group = await prisma.group.update({
    where: { id: group.id },
    data: { ownerParticipantId: owner.id },
  });

  // === 3. 나머지 참여자 8명 생성 ===
  const participants = [];
  for (let i = 1; i <= 8; i++) {
    const p = await prisma.participant.upsert({
      where: {
        groupId_nickname: { groupId: group.id, nickname: `tester${i}` },
      },
      update: {},
      create: {
        groupId: group.id,
        nickname: `tester${i}`,
        password: 'test123',
      },
    });
    participants.push(p);
  }

  // === 4. 기록 생성 (여러명, 다양한 운동시간/운동종류/날짜) ===
  const allUsers = [owner, ...participants];
  const today = new Date();

  // 각 사용자별 11개 기록 = 총 99개 이상
  for (const [index, user] of allUsers.entries()) {
    for (let i = 1; i <= 11; i++) {
      await prisma.record.create({
        data: {
          groupId: group.id,
          participantId: user.id,
          exercise: [ExerciseType.run, ExerciseType.bike, ExerciseType.swim][
            i % 3
          ], // 다양하게 분배
          description: `Record ${i} by ${user.nickname}`,
          seconds: 30 + i * 10 + index * 5, // 운동 시간 다양화
          createdAt: new Date(today.getTime() - (i + index) * 60000), // 분 단위로 시간 차이
        },
      });
    }
  }

  // === 5. 그룹에 태그 연결 ===
  await prisma.group.update({
    where: { id: group.id },
    data: {
      tags: {
        connectOrCreate: [
          {
            where: { name: 'test' },
            create: { name: 'test' },
          },
          {
            where: { name: 'practice' },
            create: { name: 'practice' },
          },
          {
            where: { name: 'ranking' },
            create: { name: 'ranking' },
          },
        ],
      },
    },
  });

  console.log(
    '✅ Dummy data inserted (오너+참여자 9명, 기록 90개+, 운동종류/시간/날짜 다양, 태그/좋아요 포함)',
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
