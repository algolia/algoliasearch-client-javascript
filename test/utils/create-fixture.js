module.exports = createFixture;

function createFixture(opts) {
  var AlgoliaSearch = require('algoliasearch');
  var getCredentials = require('./get-credentials');

  opts = opts || {};

  var credentials = getCredentials();

  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey, opts.clientOptions);
  var index = client.initIndex(opts.indexName || credentials.indexName);

  return {
    client: client,
    index: index,
    credentials: credentials
  };
}
