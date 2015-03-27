var domready = require('domready');

domready(run);

function run() {
  require('bulk-require')(__dirname, ['spec/**/*.js']);
}
