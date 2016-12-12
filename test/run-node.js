'use strict';

process.env.RESET_TO_FIRST_HOST_TIMER = 100;

require('bulk-require')(__dirname, [
  'spec/common/**/*.js',
  'spec/node/**/*.js'
]);
