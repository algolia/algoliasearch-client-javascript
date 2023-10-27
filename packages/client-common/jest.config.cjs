/** @type {import('jest').Config.InitialOptions} */
const baseConfig = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
  moduleDirectories: ['../../node_modules'],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  }
};
/** @type {import('jest').Config} */
module.exports = {
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
