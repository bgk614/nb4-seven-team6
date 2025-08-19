// vitest.config.ts

import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    pool: 'threads',
    // 파일 동시 실행 막기 (한 스레드로)
    poolOptions: { threads: { singleThread: true } },
    sequence: { concurrent: false },
  },
});
