import { FlatCompat } from '@eslint/eslintrc';
import typeScriptEsLintPlugin from '@typescript-eslint/eslint-plugin';
import esLintConfigPrettier from 'eslint-config-prettier';

const compat = new FlatCompat({
  // import.meta.dirname is available after Node.js v20.11.0
  baseDirectory: import.meta.dirname,
  recommendedConfig: typeScriptEsLintPlugin.configs['recommended'],
});

const eslintConfig = [
  ...compat.config({
    extends: [
      'next',
      'next/core-web-vitals',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['react', '@typescript-eslint'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }),
  esLintConfigPrettier,
];

export default eslintConfig;
