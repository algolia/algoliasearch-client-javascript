import type { Config } from '@jest/types';

const baseConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
};

const config: Config.InitialOptions = {
  projects: [
    {
      ...baseConfig,
      testEnvironment: 'jsdom',
      testPathIgnorePatterns: [
        'src/__tests__/cache/null-cache.test.ts',
        'src/__tests__/cache/memory-cache.test.ts',
      ],
    },
    {
      ...baseConfig,
      testEnvironment: 'node',
      testPathIgnorePatterns: [
        'src/__tests__/cache/browser-local-storage-cache.test.ts',
        'src/__tests__/cache/fallbackable-cache.test.ts',
      ],
    },
  ],
};

export default config;
