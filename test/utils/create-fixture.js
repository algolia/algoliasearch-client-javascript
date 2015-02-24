module.exports = createFixture;

function createFixture() {
  var AlgoliaSearch = require('algoliasearch');
  var getCredentials = require('./get-credentials');

  var credentials = getCredentials();

  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey);
  var index = client.initIndex(credentials.indexName);

  return {
    client: client,
    index: index,
    credentials: credentials
  };
}
