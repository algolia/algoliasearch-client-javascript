'use strict';

process.env.RESET_APP_DATA_TIMER = 3000;

require('bulk-require')(__dirname, [
  'spec/common/**/*.js',
  'spec/node/**/*.js'
]);
