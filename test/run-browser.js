'use strict';

process.env.RESET_TO_FIRST_HOST_TIMER = 100;

var domready = require('domready');

// wait for domready to allo test runner to do ajax requests before we
// start intercepting them in our tests
domready(run);

function run() {
  // even when dom is ready, wait a little more before launching the tests,
  // sometimes too fast for IE
  setTimeout(function() {
    require('bulk-require')(__dirname, [
      'spec/common/**/*.js',
      'spec/browser/**/*.js'
    ]);
  }, 1000);
}
