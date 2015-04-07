var domready = require('domready');

// wait for domready to allo test runner to do ajax requests before we
// start intercepting them in our tests
domready(run);

function run() {
  require('bulk-require')(__dirname, [
    'spec/common/**/*.js',
    'spec/browser/**/*.js'
  ]);
}
