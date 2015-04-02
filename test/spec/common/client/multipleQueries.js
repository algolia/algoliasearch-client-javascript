var test = require('tape');

test('client.startQueriesBatch(), client.addQueryInBatch(), client.sendQueriesBatch()', function(t) {
  t.plan(4);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;

  fauxJax.install();

  client.startQueriesBatch();
  client.addQueryInBatch(fixture.credentials.index, 'first query');
  client.addQueryInBatch(fixture.credentials.index, 'second query', { hitsPerPage: 42 });
  client.sendQueriesBatch();

  fauxJax.waitFor(1, function(err, requests) {
    t.error(err);
    fauxJax.restore();

    requests[0].respond(200, {}, '{}');

    t.equal(
      1,
      requests.length,
      'We made one request'
    );

    t.equal(
      parse(requests[0].requestURL, true).pathname,
      '/1/indexes/*/queries',
      'Perform a single API call'
    );

    t.deepEqual(
      JSON.parse(requests[0].requestBody),
      {
        requests: [
          { params: 'query=first%20query' },
          { params: 'query=second%20query&hitsPerPage=42' }
        ]
      },
      'Perform 2 requests'
    );
  });
});
