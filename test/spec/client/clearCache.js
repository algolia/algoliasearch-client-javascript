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
  client.sendQueriesBatch(makeSecondRequest);
  fauxJax.requests[0].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    1,
    'One request done'
  );

  function makeSecondRequest() {
    // same request again
    client.startQueriesBatch();
    client.sendQueriesBatch(makeThirdRequest);
    t.equal(
      fauxJax.requests.length,
      1,
      'Still one request done'
    );
  }

  function makeThirdRequest() {
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
  }
});
