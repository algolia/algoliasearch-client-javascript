'use strict';

module.exports = createFixture;

function createFixture(opts) {
  var algoliasearch = require('../../');
  var getCredentials = require('./get-credentials');

  opts = opts || {};

  var credentials = getCredentials();

  var client = algoliasearch(credentials.applicationID, credentials.searchOnlyAPIKey, opts.clientOptions);
  var index = client.initIndex(opts.indexName || credentials.indexName);

  return {
    client: client,
    index: index,
    credentials: credentials,
    algoliasearch: algoliasearch
  };
}
