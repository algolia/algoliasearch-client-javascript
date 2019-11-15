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
  collectCoverageFrom: ['**/src*/*.ts', '!**/src/__tests__/**/*.ts'],
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
        testPathIgnorePatterns: [
          'packages/requester-node-http/*',
          'packages/algoliasearch/src/__tests__/node.test.ts',
          'packages/client-search/src/__tests__/integration/mcm.test.ts',
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
          'packages/algoliasearch/src/__tests__/browser.test.ts',
          'packages/algoliasearch/src/__tests__/browser-lite.test.ts',
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
