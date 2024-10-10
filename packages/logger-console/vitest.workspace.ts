import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: ['src/__tests__/logger-console.test.ts'],
      name: 'node',
      environment: 'node',
    },
  },
  {
    test: {
      include: ['src/__tests__/logger-console.test.ts'],
      name: 'jsdom',
      environment: 'jsdom',
    },
  },
]);
