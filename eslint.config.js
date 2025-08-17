import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';

export default [
  {
    files: [],
    plugins: {
      '@typescript-eslint': typescriptEslint,
    },
    rules: {
      files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
      plugins: { js },
      extends: ['js/recommended'],
      languageOptions: { globals: globals.browser },
      '@typescript-eslint/indent': ['error', 2],
    },
  },
  eslintConfigPrettier,
];
