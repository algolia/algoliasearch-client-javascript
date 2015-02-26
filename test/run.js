// make globals writable to IE<=8,
// so that we can use sinon.useFakeTimers();
// this should be done by sinon.js but not in npm/commonJS world
// see https://github.com/cjohansen/Sinon.JS/pull/600#issuecomment-76154721
require('writable-window-method')([
  'setTimeout',
  'clearTimeout',
  'setImmediate',
  'clearImmediate',
  'setInterval',
  'clearInterval',
  'Date'
]);

require('bulk-require')(__dirname, ['spec/**/*.js']);
