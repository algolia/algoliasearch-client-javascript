'use strict';

process.env.RESET_APP_DATA_TIMER = 3000;

const domready = require('domready');

// wait for domready to allow test runner to do ajax requests before we
// start intercepting them in our tests
domready(run);

function run() {
  // even when dom is ready, wait a little more before launching the tests,
  // sometimes too fast for IE
  setTimeout(() => {
    require('bulk-require')(__dirname, [
      'spec/common/**/*.js',
      'spec/browser/**/*.js',
    ]);
  }, 1000);
}
