/* eslint-disable import/no-commonjs, functional/immutable-data */
const { pathsToModuleNameMapper } = require('ts-jest/utils');

const { compilerOptions } = require('./tsconfig');

const config = {
  testMatch: ['**/__tests__/**/*.test.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>config/jest.js', 'jest-mock-console/dist/setupTestFramework.js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  transformIgnorePatterns: [],
  coverageReporters: ['text'],
  collectCoverage: true,
  collectCoverageFrom: ['**/src*/*.ts', '!**/src/__tests__/*.ts'],
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
        displayName: 'browser-lite',
        testEnvironment: 'jsdom',
        roots: ['packages/client-search/src/__tests__/integration'],
        testPathIgnorePatterns: [
          'packages/client-search/src/__tests__/integration/api-keys.test.ts',
          'packages/client-search/src/__tests__/integration/batching.test.ts',
          'packages/client-search/src/__tests__/integration/browsing.test.ts',
          'packages/client-search/src/__tests__/integration/chunked-batch.test.ts',
          'packages/client-search/src/__tests__/integration/copy-and-move-index.test.ts',
          'packages/client-search/src/__tests__/integration/exists.test.ts',
          'packages/client-search/src/__tests__/integration/get-logs.test.ts',
          'packages/client-search/src/__tests__/integration/indexing.test.ts',
          'packages/client-search/src/__tests__/integration/mcm.test.ts',
          'packages/client-search/src/__tests__/integration/replacing.test.ts',
          'packages/client-search/src/__tests__/integration/rules.test.ts',
          'packages/client-search/src/__tests__/integration/secured-api-keys.test.ts',
          'packages/client-search/src/__tests__/integration/settings.test.ts',
          'packages/client-search/src/__tests__/integration/synonyms.test.ts',
          'packages/client-search/src/__tests__/integration/dictionary.test.ts',
        ],
        globals: {
          environment: 'browser-lite',
          isBrowser: true,
          'ts-jest': { isolatedModules: true },
          window: {},
        },
      },
      config
    ),
    Object.assign(
      {
        displayName: 'browser',
        testEnvironment: 'jsdom',
        testPathIgnorePatterns: [
          'packages/requester-node-http/*',
          'packages/client-search/src/__tests__/integration/secured-api-keys.test.ts',
          'packages/client-search/src/__tests__/integration/dictionary.test.ts',
        ],
        globals: {
          environment: 'browser',
          isBrowser: true,
          'ts-jest': { isolatedModules: true },
          window: {},
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
          'packages/algoliasearch/src/__tests__/lite.test.ts',
        ],
        globals: {
          environment: 'node',
          isBrowser: false,
          'ts-jest': { isolatedModules: true },
          window: {},
        },
      },
      config
    ),
  ],
};
