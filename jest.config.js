/* eslint-disable import/no-commonjs, functional/immutable-data */

const config = {
  testMatch: ['**/__tests__/**/*.test.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>config/jest.js', 'jest-mock-console/dist/setupTestFramework.js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [],
  coverageReporters: ['text'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/__tests__/**/*.ts'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

module.exports = {
  projects: [
    Object.assign(
      {
        displayName: 'browser',
        testEnvironment: 'jsdom',
        testPathIgnorePatterns: ['packages/requester-node-http/*'],
        globals: {
          environment: 'browser',
          isBrowser: true,
        },
      },
      config
    ),
    Object.assign(
      {
        displayName: 'node',
        testEnvironment: 'node',
        testPathIgnorePatterns: [
          'packages/requester-browser-xhr/*',
          'packages/cache-browser-local-storage/*',
        ],
        globals: {
          environment: 'node',
          isBrowser: false,
        },
      },
      config
    ),
  ],
};
