import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'], 
    ignores: ['node_modules', 'dist'], 
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser, 
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...js.configs.recommended.rules, 
      'prettier/prettier': 'error', 
      '@typescript-eslint/indent': ['error', 2],
    },
  },
  eslintConfigPrettier, 
];
