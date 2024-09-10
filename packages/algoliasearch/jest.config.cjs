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
      testMatch: [ '**/algoliasearch.browser.*' ],
    },
    {
      ...baseConfig,
      testEnvironment: 'node',
      testMatch: [ '**/algoliasearch.(node|common).*' ],
    },
    {
      ...baseConfig,
      testEnvironment: "miniflare",
      testMatch: [ '**/algoliasearch.fetch.*' ],
    },
  ],
};
