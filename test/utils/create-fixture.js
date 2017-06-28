'use strict';

module.exports = createFixture;

function createFixture(opts) {
  const algoliasearch = require('../../');
  const getCredentials = require('./get-credentials');

  opts = opts || {};

  const credentials = opts.credentials || getCredentials();

  const client = algoliasearch(
    credentials.applicationID,
    credentials.searchOnlyAPIKey,
    opts.clientOptions
  );
  const index = client.initIndex(opts.indexName || credentials.indexName);

  return {
    client,
    index,
    credentials,
    algoliasearch,
  };
}
