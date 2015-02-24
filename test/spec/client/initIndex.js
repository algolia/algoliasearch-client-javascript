var test = require('tape');

test('client.initIndex()', function(t) {
  t.plan(1);

  var AlgoliaSearch = require('algoliasearch');
  var getCredentials = require('../../utils/get-credentials');

  var credentials = getCredentials();

  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey);

  t.doesNotThrow(client.initIndex.bind(client, credentials.indexName));
});
