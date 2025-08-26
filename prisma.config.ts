import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  schema: './prisma/schema.prisma',
  seed: 'node prisma/seed.js',
});
