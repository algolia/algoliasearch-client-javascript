/* eslint-disable import/no-commonjs, functional/immutable-data */

const baseConfig = require('./wdio.base.conf');

exports.config = {
  headless: false,
  ...baseConfig,
  services: [...(baseConfig.services || []), 'selenium-standalone'],
  capabilities: [
    {
      browserName: 'chrome',
    },
  ],
};
