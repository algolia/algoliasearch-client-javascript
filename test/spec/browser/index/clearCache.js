'use strict';

var test = require('tape');

test('index.clearCache()', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;
  var nbRequests = 0;

  fauxJax.install();

  fauxJax.on('request', function(req) {
    nbRequests++;

    if (nbRequests === 1 || nbRequests === 2) {
      req.respond(200, {}, '{}');
    } else {
      t.fail('Too much requests received');
    }
  });

  // store the query in the cache
  index.search('hey!', makeSecondRequest);

  function makeSecondRequest() {
    // same request again
    index.search('hey!', makeThirdRequest);
  }

  function makeThirdRequest() {
    index.clearCache();

    // same request again
    index.search('hey!', function() {
      fauxJax.restore();

      t.equal(
        nbRequests,
        2,
        'Received two requests for three searches, one was cached'
      );
    });
  }
});
