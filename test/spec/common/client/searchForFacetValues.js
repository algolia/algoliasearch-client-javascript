'use strict';

var test = require('tape');

test('client.searchForFacetValues()', function(t) {
  t.plan(6);

  var bind = require('lodash-compat/function/bind');

  var algoliasearch = require('../../../../');
  var getCredentials = require('../../../utils/get-credentials');

  var credentials = getCredentials();

  var client = algoliasearch(credentials.applicationID, credentials.searchOnlyAPIKey);

  t.throws(client.searchForFacetValues);
  t.throws(bind(client.searchForFacetValues, client));
  t.throws(bind(client.searchForFacetValues, client, {
    params: {facetName: '', facetQuery: ''}
  }));
  t.throws(bind(client.searchForFacetValues, client, {
    indexName: credentials.indexName,
    params: {facetQuery: ''}
  }));
  t.throws(bind(client.searchForFacetValues, client, {
    indexName: credentials.indexName,
    params: {facetName: ''}
  }));

  t.doesNotThrow(bind(client.searchForFacetValues, client, {
    indexName: credentials.indexName,
    params: {facetName: '', facetQuery: ''}
  }));
});
