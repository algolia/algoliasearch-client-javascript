/* eslint-disable import/no-commonjs, functional/immutable-data */

require('dotenv').config();

const baseConfig = require('./wdio.base.conf');

const sauceOptions = {
  // Force Selenium version on Firefox, solves an issue with `setValue`
  // https://github.com/webdriverio/webdriverio/issues/3443
  seleniumVersion: '3.11.0',
  recordVideo: false,
  recordScreenshots: false,
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
