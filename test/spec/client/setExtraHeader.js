var test = require('tape');

test('client.setExtraHeader(key, value)', function(t) {
  t.plan(2);

  var AlgoliaSearch = require('algoliasearch');
  var fauxJax = require('faux-jax');
  var url = require('url');

  var getCredentials = require('../../utils/get-credentials');

  var credentials = getCredentials();

  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey);
  var index = client.initIndex(credentials.indexName);

  fauxJax.install();

  // no extra header set
  index.search('first');

  client.setExtraHeader('X-great-header', 'yay');

  // extra header set
  index.search('second');

  var firstRequest = url.parse(fauxJax.requests[0].requestURL, true);
  var secondRequest = url.parse(fauxJax.requests[1].requestURL, true);

  t.notOk(
    firstRequest.query['X-great-header'],
    'No `X-great-header` set on first request'
  );

  t.equal(
    secondRequest.query['X-great-header'],
    'yay',
    '`X-great-header` set on second request'
  );

  fauxJax.requests[0].respond(200, {}, '{}');
  fauxJax.requests[1].respond(200, {}, '{}');

  fauxJax.restore();
});
