/* eslint-disable import/no-commonjs, functional/immutable-data */
module.exports = {
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
