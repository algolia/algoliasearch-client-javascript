/* eslint-disable import/no-commonjs */
module.exports = {
  testMatch: ['**/__tests__/**/*.test.ts'],
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>config/jest.js'],
};
