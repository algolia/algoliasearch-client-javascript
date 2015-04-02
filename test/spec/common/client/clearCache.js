var test = require('tape');

test('client.clearCache()', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
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
  client.startQueriesBatch();
  client.sendQueriesBatch(makeSecondRequest);

  function makeSecondRequest() {
    // same request again
    client.startQueriesBatch();
    client.sendQueriesBatch(makeThirdRequest);
  }

  function makeThirdRequest() {
    client.clearCache();

    // same request again
    client.startQueriesBatch();
    client.sendQueriesBatch(function() {
      fauxJax.restore();

      t.equal(
        nbRequests,
        2,
        'Received two requests for three searches, one was cached'
      );
    });
  }
});
