// seed.js
// 사용법:
//   node seed.js --groupId=1
//   node seed.js --groupId=1 --reset

import { PrismaClient } from './src/generated/prisma/index.js';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function getArg(name, defVal) {
  const cli = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (cli) return cli.split('=')[1];
  const envKey = name.toUpperCase();
  return process.env[envKey] ?? defVal;
}

async function ensureGroup(groupId) {
  let g = await prisma.group.findUnique({ where: { id: groupId } });
  if (!g) {
    g = await prisma.group.create({
      data: {
        id: groupId,
        name: `샘플그룹#${groupId}`,
        description: 'seed 생성',
        photoUrl: null,
        goalRep: 0,
        discordWebhookUrl: '',
        discordInviteUrl: '',
        likeCount: 0,
        // ownerParticipantId 는 나중에 지정 (nullable)
      },
    });
  }
  return g;
}

async function upsertParticipant(groupId, nickname, pw) {
  const hashed = await bcrypt.hash(pw, 10);
  return prisma.participant.upsert({
    where: { groupId_nickname: { groupId, nickname } }, // @@unique([groupId, nickname])
    update: {}, // 이미 있으면 변경 없음
    create: { groupId, nickname, password: hashed },
  });
}

async function upsertTag(name) {
  return prisma.tag.upsert({ where: { name }, update: {}, create: { name } });
}

async function upsertBadge(
  type /* 'LIKE_100' | 'PARTICIPATION_10' | 'RECORD_100' */,
) {
  return prisma.badge.upsert({ where: { type }, update: {}, create: { type } });
}

async function createRecordOnce(
  groupId,
  participantId,
  exercise /* 'RUN'|'BIKE'|'SWIM' */,
  seconds,
  distanceKm,
  description,
  photos = [],
) {
  // 같은 내용 중복 삽입 방지
  const exists = await prisma.record.findFirst({
    where: {
      groupId,
      participantId,
      exercise,
      seconds,
      distanceKm,
      description: description ?? null,
    },
  });
  if (exists) return exists;

  return prisma.record.create({
    data: {
      groupId,
      participantId,
      // ⚠️ Prisma enum은 키값('RUN'|'BIKE'|'SWIM')을 받습니다.
      // @map 덕분에 DB에는 'run'|'bike'|'swim'으로 저장됨.
      exercise,
      seconds,
      distanceKm,
      description,
      photos: photos.length
        ? { create: photos.map((url) => ({ url })) }
        : undefined,
    },
  });
}

async function main() {
  const groupId = Number(getArg('groupId', 1));
  const reset = !!getArg('reset', '') || !!getArg('RESET', '');

  if (!groupId || Number.isNaN(groupId)) {
    throw new Error('그룹 id를 지정해 주세요. 예) --groupId=1');
  }

  const group = await ensureGroup(groupId);

  // 선택: 해당 그룹의 기록만 초기화
  if (reset) {
    await prisma.recordPhoto.deleteMany({ where: { record: { groupId } } });
    await prisma.record.deleteMany({ where: { groupId } });
  }

  // 참가자 2명
  const owner = await upsertParticipant(groupId, 'testuser', 'pw1234');
  const member = await upsertParticipant(groupId, 'member1', 'pw5678');

  // 오너 지정(비어있거나 다른 경우만)
  if (!group.ownerParticipantId || group.ownerParticipantId !== owner.id) {
    await prisma.group.update({
      where: { id: groupId },
      data: { ownerParticipantId: owner.id },
    });
  }

  // 태그/배지
  const tags = await Promise.all(['달리기', '자전거', '수영'].map(upsertTag));
  const badges = await Promise.all(
    ['LIKE_100', 'PARTICIPATION_10', 'RECORD_100'].map(upsertBadge),
  );
  await prisma.group.update({
    where: { id: groupId },
    data: {
      tags: { connect: tags.map((t) => ({ id: t.id })) },
      badges: { connect: badges.map((b) => ({ id: b.id })) },
    },
  });

  // 샘플 운동 기록 3개
  await createRecordOnce(groupId, owner.id, 'run', 1200, 3.5, '아침 러닝', [
    'https://cdn.example.com/run1.jpg',
  ]);
  await createRecordOnce(
    groupId,
    member.id,
    'bike',
    1800,
    12.2,
    '출퇴근 라이딩',
    ['https://cdn.example.com/bike1.jpg', 'https://cdn.example.com/bike2.jpg'],
  );
  await createRecordOnce(
    groupId,
    owner.id,
    'swim',
    900,
    0.8,
    '수영 인터벌',
    [],
  );

  const counts = {
    groups: await prisma.group.count(),
    participants: await prisma.participant.count({ where: { groupId } }),
    tags: await prisma.tag.count(),
    badges: await prisma.badge.count(),
    records: await prisma.record.count({ where: { groupId } }),
    record_photos: await prisma.recordPhoto.count(),
  };

  console.log(`Seeding done for groupId=${groupId} (reset=${reset})`);
  console.table(counts);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
