var test = require('tape');

test('client.clearCache()', function(t) {
  t.plan(4);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No request done'
  );

  // store the query in the cache
  client.startQueriesBatch();
  client.sendQueriesBatch();
  fauxJax.requests[0].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    1,
    'One request done'
  );

  // same request again
  client.startQueriesBatch();
  client.sendQueriesBatch();
  t.equal(
    fauxJax.requests.length,
    1,
    'Still one request done'
  );

  client.clearCache();

  // same request again
  client.startQueriesBatch();
  client.sendQueriesBatch();

  fauxJax.requests[1].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    2,
    'Second request done'
  );

  fauxJax.restore();
});
