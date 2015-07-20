'use strict';

var test = require('tape');

// Prototype.js < 1.7, a widely used library, defines a weird
// Array.prototype.toJSON function that will fail to stringify our content
// appropriately
// refs:
//   - https://groups.google.com/forum/#!topic/prototype-core/E-SAVvV_V9Q
//   - https://github.com/sstephenson/prototype/commit/038a2985a70593c1a86c230fadbdfe2e4898a48c
//   - http://stackoverflow.com/a/3148441/147079
test('JSON.stringify works well even when using Prototype.js < 1.7', function(t) {
  /* eslint no-extend-native:0 */
  t.plan(1);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');

  var fixture = createFixture();

  var index = fixture.index;

  fauxJax.install();

  Array.prototype.toJSON = function() {
    t.fail('Array.toJSON was called');
  };

  index.search({
    facets: ['firstIndex']
  }, function() {
    t.pass('search callback got called');
    delete Array.prototype.toJSON;
  });

  fauxJax.once('request', function(req) {
    req.respond(200, {}, '{}');
    fauxJax.restore();
  });
});
