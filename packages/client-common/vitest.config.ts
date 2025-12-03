import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: [
            'src/__tests__/cache/null-cache.test.ts',
            'src/__tests__/cache/memory-cache.test.ts',
            'src/__tests__/create-iterable-promise.test.ts',
            'src/__tests__/logger/null-logger.test.ts',
            'src/__tests__/transporter/cache.test.ts',
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
            'src/__tests__/logger/null-logger.test.ts',
            'src/__tests__/transporter/cache.test.ts',
          ],
          name: 'jsdom',
          environment: 'jsdom',
        },
      },
    ],
  },
});
