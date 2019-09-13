/* eslint-disable import/no-commonjs, functional/immutable-data */

require('dotenv').config();

const baseConfig = require('./wdio.base.conf');

module.exports = {
  ...baseConfig,
  services: [...(baseConfig.services || []), 'sauce'],
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  maxInstances: 5,
  specFileRetries: 0,
  capabilities: [
    {
      browserName: 'chrome',
      browserVersion: '76.0',
    },
  ],
};
