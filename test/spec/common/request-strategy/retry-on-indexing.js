'use strict';

var test = require('tape');

test('when indexing content, we retry if timeout occurs', function(t) {
  t.plan(7);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      timeout: 20
    }
  });

  var index = fixture.index;

  fauxJax.install();
  fauxJax.on('request', function() {
    t.pass('One request made');
  });

  index.addObject({
    hello: 'world'
  }, function(err) {
    fauxJax.restore();
    t.ok(err instanceof Error);

    t.equal(
      err.name,
      'AlgoliaSearchRequestTimeoutError',
      'error name matches'
    );

    t.equal(
      err.message,
      'Request timedout before getting a response',
      'error messag ematches'
    );
  });
});
