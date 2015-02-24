var test = require('tape');

test('client.multipleQueries', function(t) {
  t.plan(3);

  var AlgoliaSearch = require('algoliasearch');
  var fauxJax = require('faux-jax');
  var url = require('url');
  var getCredentials = require('../../../utils/get-credentials');

  var credentials = getCredentials();
  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey);

  fauxJax.install();

  client.startQueriesBatch();
  client.addQueryInBatch(credentials.index, 'first query');
  client.addQueryInBatch(credentials.index, 'second query', { hitsPerPage: 42 });
  client.sendQueriesBatch();
  fauxJax.requests[0].respond(200, {}, '');

  t.equal(
    fauxJax.requests.length,
    1,
    'A single API call is performed'
  );

  t.equal(
    url.parse(fauxJax.requests[0].requestURL, true).pathname,
    '/1/indexes/*/queries',
    'Perform a single API call'
  );

  t.deepEqual(
    JSON.parse(fauxJax.requests[0].requestBody),
    {
      requests: [
        { params: "query=first%20query" },
        { params: "query=second%20query&hitsPerPage=42" }
      ]
    },
    'Perform 2 requests'
  );

  fauxJax.restore();
});
