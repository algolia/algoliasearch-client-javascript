var test = require('tape');

test('client.clearCache()', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No requests in the cache'
  );

  // store the query in the cache
  client.startQueriesBatch();
  client.sendQueriesBatch();
  fauxJax.requests[0].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    1,
    'Cache is filled with 1 request'
  );

  // same request again
  client.startQueriesBatch();
  client.sendQueriesBatch();
  t.equal(
    fauxJax.requests.length,
    1,
    'Cache is still filled with a single request'
  );

  fauxJax.restore();
});
