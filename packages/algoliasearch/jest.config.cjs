/** @type {import('jest').Config.InitialOptions} */
const baseConfig = {
  preset: 'ts-jest',
  roots: ['__tests__'],
  moduleDirectories: ['../../node_modules'],
  transform: { "\\.[jt]sx?$": "babel-jest", } 
};
/** @type {import('jest').Config} */
module.exports = {
  projects: [
    {
      ...baseConfig,
      testEnvironment: 'jsdom',
      testPathIgnorePatterns: [ '__tests__/algoliasearch.node.test.ts' ],
    },
    {
      ...baseConfig,
      testEnvironment: 'node',
      testPathIgnorePatterns: [ '__tests__/algoliasearch.browser.test.ts' ],
    },
  ],
};
