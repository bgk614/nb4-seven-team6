// src/utils/password.ts

import bcrypt from 'bcryptjs';

function looksHashed(pw: string) {
  // 간단한 감지: bcrypt는 보통 $2a$/$2b$/$2y$ 접두
  return /^\$2[aby]\$[0-9]{2}\$/.test(pw);
}

export async function verifyPassword(input: string, stored: string) {
  if (looksHashed(stored)) return bcrypt.compare(input, stored);
  return input === stored;
}
