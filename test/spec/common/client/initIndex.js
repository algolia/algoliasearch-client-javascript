'use strict';

const test = require('tape');

test('client.initIndex()', t => {
  t.plan(1);

  const bind = require('lodash-compat/function/bind');

  const algoliasearch = require('../../../../');
  const getCredentials = require('../../../utils/get-credentials');

  const credentials = getCredentials();

  const client = algoliasearch(
    credentials.applicationID,
    credentials.searchOnlyAPIKey
  );

  t.doesNotThrow(bind(client.initIndex, client, credentials.indexName));
});
