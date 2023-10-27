/** @type {import('jest').Config} */
module.exports = {
  roots: ['__tests__'],
  moduleDirectories: ['../../node_modules'],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  }
};
