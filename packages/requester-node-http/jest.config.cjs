/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
  testEnvironment: 'node',
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
};
