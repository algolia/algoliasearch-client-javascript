/* eslint-disable import/no-commonjs, functional/immutable-data */
module.exports = {
  testMatch: ['**/__tests__/**/*.test.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>config/jest.js', 'jest-mock-console/dist/setupTestFramework.js'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: [],
  collectCoverageFrom: ['**/src/**/*.ts', '!**/src/__tests__/**/*.ts'],
};
