// vitest.config.ts

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    pool: 'threads',
    // 파일 동시 실행 막기 (한 스레드로)
    poolOptions: { threads: { singleThread: true } },
    sequence: { concurrent: false },
  },
});
