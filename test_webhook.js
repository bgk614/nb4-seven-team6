// Discord 웹훅 테스트 스크립트
// 사용법: node test_webhook.js

const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1410447199543758980/_Tw8LLYUBY-25WcZ3g3Mll1nmkJsqnQ0TlCwx2hemQkDLVoaZMVwak1aD3vXXtg-8yny'; // 실제 웹훅 URL로 교체

async function testWebhook() {
  if (DISCORD_WEBHOOK_URL === 'YOUR_WEBHOOK_URL_HERE') {
    console.log('⚠️ DISCORD_WEBHOOK_URL을 실제 웹훅 URL로 교체해주세요');
    return;
  }

  console.log('📡 Discord 웹훅 테스트 시작...');

  try {
    // 1. 간단한 테스트 메시지
    console.log('1️⃣ 간단한 테스트 메시지 전송...');
    const response1 = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '🧪 **웹훅 테스트 메시지**\n백엔드 서버에서 전송되었습니다!',
      }),
    });

    if (response1.ok) {
      console.log('✅ 간단한 메시지 전송 성공!');
    } else {
      console.log('❌ 간단한 메시지 전송 실패:', response1.status);
    }

    // 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 2. 실제 운동 기록 형식 메시지
    console.log('2️⃣ 실제 운동 기록 형식 메시지 전송...');
    const recordMessage = `🏃‍♂️ **새로운 운동 기록이 등록되었습니다!**
**그룹**: 🏃 테스트 러닝 그룹
**참가자**: 웹훅테스터
**운동**: 러닝
**시간**: 25분 30초 (1530초)
**거리**: 4.20 km
**설명**: Discord 웹훅 연동 테스트용 러닝 기록입니다
**사진 수**: 1`;

    const response2 = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: recordMessage,
      }),
    });

    if (response2.ok) {
      console.log('✅ 운동 기록 메시지 전송 성공!');
    } else {
      console.log('❌ 운동 기록 메시지 전송 실패:', response2.status);
    }

    // 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Embed 형식으로 전송
    console.log('3️⃣ Embed 형식 메시지 전송...');
    const embedMessage = {
      embeds: [
        {
          title: '🏃‍♂️ 새로운 운동 기록',
          description: '새로운 운동 기록이 등록되었습니다!',
          color: 0x00ff00, // 초록색
          fields: [
            { name: '그룹', value: '🏃 테스트 러닝 그룹', inline: true },
            { name: '참가자', value: '웹훅테스터', inline: true },
            { name: '운동', value: '러닝', inline: true },
            { name: '시간', value: '25분 30초', inline: true },
            { name: '거리', value: '4.20 km', inline: true },
            { name: '설명', value: 'Discord 웹훅 연동 테스트 (Embed 형식)' },
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: '운동 기록 봇',
          },
        },
      ],
    };

    const response3 = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(embedMessage),
    });

    if (response3.ok) {
      console.log('✅ Embed 메시지 전송 성공!');
    } else {
      console.log('❌ Embed 메시지 전송 실패:', response3.status);
    }

    console.log('🎉 Discord 웹훅 테스트 완료!');
  } catch (error) {
    console.error('❌ 웹훅 테스트 중 오류:', error.message);
  }
}

// API 엔드포인트로 실제 기록 생성 테스트
async function testRealAPI() {
  const API_BASE = 'http://localhost:3001';

  console.log('🔧 실제 API로 운동 기록 생성 테스트...');

  try {
    // 먼저 그룹 생성 (실제 Discord 웹훅 URL 포함)
    const groupData = {
      name: '웹훅 테스트 그룹',
      description: 'Discord 웹훅 연동 테스트용 그룹',
      photoUrl: 'https://example.com/group.jpg',
      goalRep: 10,
      discordWebhookUrl: DISCORD_WEBHOOK_URL, // 실제 웹훅 URL
      discordInviteUrl: 'https://discord.gg/example',
      tags: ['테스트', '웹훅'],
      nickname: '웹훅테스터',
      password: '123456',
    };

    console.log('📝 테스트 그룹 생성 중...');
    const groupResponse = await fetch(`${API_BASE}/groups`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(groupData),
    });

    if (!groupResponse.ok) {
      console.log('❌ 그룹 생성 실패:', groupResponse.status);
      return;
    }

    const group = await groupResponse.json();
    console.log('✅ 테스트 그룹 생성 성공! ID:', group.id);

    // 2초 대기
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 운동 기록 생성 (웹훅 트리거)
    const recordData = {
      authorNickname: '웹훅테스터',
      authorPassword: '123456',
      exerciseType: 'run',
      description: 'API를 통한 실제 운동 기록 생성 테스트 (Discord 웹훅 포함)',
      time: 1800, // 30분
      distance: 5.5,
      photos: ['https://example.com/running.jpg'],
    };

    console.log('🏃‍♂️ 운동 기록 생성 중 (웹훅 트리거)...');
    const recordResponse = await fetch(
      `${API_BASE}/groups/${group.id}/records`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordData),
      },
    );

    if (recordResponse.ok) {
      console.log('✅ 운동 기록 생성 성공! Discord 메시지를 확인해보세요!');
    } else {
      console.log('❌ 운동 기록 생성 실패:', recordResponse.status);
      const error = await recordResponse.text();
      console.log('에러 내용:', error);
    }
  } catch (error) {
    console.error('❌ API 테스트 중 오류:', error.message);
  }
}

// 실행
console.log('=== Discord 웹훅 테스트 시작 ===\n');

if (process.argv.includes('--api')) {
  testRealAPI();
} else {
  testWebhook();
}

console.log('\n사용법:');
console.log('- 웹훅만 테스트: node test_webhook.js');
console.log('- 실제 API 테스트: node test_webhook.js --api');
console.log(
  '\n⚠️ 먼저 스크립트 파일에서 DISCORD_WEBHOOK_URL을 실제 값으로 교체해주세요!',
);
