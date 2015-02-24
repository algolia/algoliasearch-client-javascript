var test = require('tape');

test('client.clearCache()', function(t) {
  t.plan(3);

  var AlgoliaSearch = require('algoliasearch');
  var fauxJax = require('faux-jax');
  var getCredentials = require('../../../utils/get-credentials');

  var credentials = getCredentials();
  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey);

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No requests in the cache'
  );

  // store the query in the cache
  client.startQueriesBatch();
  client.sendQueriesBatch();
  fauxJax.requests[0].respond(200, {}, '');
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
