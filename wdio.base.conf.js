/* eslint-disable import/no-commonjs, functional/immutable-data */

const path = require('path');

module.exports = {
  services: ['static-server'],
  staticServerFolders: [
    {
      mount: '/algoliasearch-lite.com',
      path: './specs/fixtures/websites/algoliasearch-lite.com',
    },
    {
      mount: '/algoliasearch.com',
      path: './specs/fixtures/websites/algoliasearch.com',
    },
  ],
  staticServerPort: 5000,
  baseUrl: 'http://localhost:5000',
  specs: [path.join(__dirname, 'specs/**/*.spec.ts')],
  logLevel: 'warn',
  waitforTimeout: 10000,
  bail: 1,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
  },
  reporters: ['spec'],
  before() {
    require('ts-node').register({
      transpileOnly: true,
      ignore: [],
      project: path.join(__dirname, './tsconfig.json'),
    });
  },
};
