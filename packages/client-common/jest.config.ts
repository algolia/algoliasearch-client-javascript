import type { Config } from '@jest/types';

const baseConfig: Config.InitialOptions = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
  moduleDirectories: ['../../node_modules'],
};

const config: Config.InitialOptions = {
  projects: [
    {
      ...baseConfig,
      testEnvironment: 'jsdom',
      testPathIgnorePatterns: [
        'src/__tests__/cache/null-cache.test.ts',
        'src/__tests__/cache/memory-cache.test.ts',
        'src/__tests__/create-iterable-promise.test.ts',
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
