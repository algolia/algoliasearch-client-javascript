// eslint-disable-next-line import/no-unresolved
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    test: {
      include: [
        'src/__tests__/cache/null-cache.test.ts',
        'src/__tests__/cache/memory-cache.test.ts',
        'src/__tests__/create-iterable-promise.test.ts',
      ],
      name: 'node',
      environment: 'node',
    },
  },
  {
    test: {
      include: [
        'src/__tests__/cache/browser-local-storage-cache.test.ts',
        'src/__tests__/cache/fallbackable-cache.test.ts',
        'src/__tests__/cache/null-cache.test.ts',
        'src/__tests__/create-iterable-promise.test.ts',
      ],
      name: 'jsdom',
      environment: 'jsdom',
    },
  },
]);
