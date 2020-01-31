/* eslint-disable import/no-commonjs, functional/immutable-data, sonarjs/no-duplicate-string */

require('dotenv').config();

const baseConfig = require('./wdio.base.conf');

const sauceOptions = {
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
      platformName: `Windows 7`,
      browserName: 'internet explorer',
      browserVersion: 'latest',
      'sauce:options': sauceOptions,
    },
    ...['7', '8.1'].map(platform => ({
      platformName: `Windows ${platform}`,
      browserName: 'internet explorer',
      browserVersion: '11.0',
      'sauce:options': sauceOptions,
    })),
    {
      platformName: 'Windows 10',
      browserName: 'internet explorer',
      browserVersion: '11.285',
      'sauce:options': sauceOptions,
    },
    {
      platformName: 'Windows 7',
      browserName: 'chrome',
      browserVersion: '76.0',
      'sauce:options': sauceOptions,
    },
    {
      platformName: 'Windows 10',
      browserName: 'chrome',
      browserVersion: '77.0',
      'sauce:options': sauceOptions,
    },
    {
      platformName: 'Windows 7',
      browserName: 'firefox',
      browserVersion: '68.0',
      'sauce:options': sauceOptions,
    },
    {
      platformName: 'Windows 10',
      browserName: 'firefox',
      browserVersion: '69.0',
      'sauce:options': sauceOptions,
    },
  ],
};
