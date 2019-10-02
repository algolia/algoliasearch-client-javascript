/* eslint-disable import/no-commonjs, functional/immutable-data */

require('dotenv').config();

const baseConfig = require('./wdio.base.conf');

const sauceOptions = {
  recordVideo: false,
  recordScreenshots: false,
  startConnect: true,
  tunnelIdentifier: process.env.CIRCLE_BUILD_NUM,
};

exports.config = {
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
      'sauce:options': sauceOptions,
    },
    {
      browserName: 'firefox',
      browserVersion: '68.0',
      'sauce:options': sauceOptions,
    },
    {
      browserName: 'internet explorer',
      browserVersion: '11.285',
      'sauce:options': sauceOptions,
    },
  ],
};
