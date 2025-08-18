// src/utils/discord.ts

export async function sendDiscordWebhook(webhookUrl: string, payload: any) {
  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`Discord webhook failed: ${res.status} ${text}`);
    (err as any).status = 502;
    throw err;
  }
}
