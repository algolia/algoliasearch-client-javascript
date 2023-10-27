/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  roots: ['src/__tests__'],
  testEnvironment: 'jsdom',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  }
};
