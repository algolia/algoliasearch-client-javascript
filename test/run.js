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

var domready = require('domready');

domready(run);

function run() {
  var test = require('tape');

  test('simple search', function(t) {
    var algoliasearch = require('../');
    var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
    var index = client.initIndex('contacts');

    index.search('atlanta', function(err, res) {
      console.log('callback', arguments);
    });

    index.search('newyork')
      .then(function() {
        console.log('promise ok', arguments);
      })
      .catch(function() {
        console.log('promise nope', arguments);
      });
  });
}
