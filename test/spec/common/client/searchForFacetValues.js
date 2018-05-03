'use strict';

var test = require('tape');

test('client.searchForFacetValues()', function(t) {
  t.plan(7);

  var bind = require('lodash-compat/function/bind');

  var fauxJax = require('faux-jax');
  fauxJax.install({gzip: true});
  let count = 0;
  fauxJax.on('request', function(req) {
    count++;
    req.respond(200, {}, '{}');
    if (count === 3) {
      fauxJax.restore();
    }
  });
  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var credentials = fixture.credentials;
  var client = fixture.client;

  t.throws(client.searchForFacetValues);
  t.throws(bind(client.searchForFacetValues, client));
  t.throws(
    bind(client.searchForFacetValues, client, [
      {
        params: {facetName: '', facetQuery: ''}
      }
    ])
  );
  t.throws(
    bind(client.searchForFacetValues, client, [
      {
        indexName: credentials.indexName,
        params: {facetQuery: ''}
      }
    ])
  );
  t.throws(
    bind(client.searchForFacetValues, client, [
      {
        indexName: credentials.indexName,
        params: {facetName: ''}
      }
    ])
  );

  t.doesNotThrow(
    bind(client.searchForFacetValues, client, [
      {
        indexName: credentials.indexName,
        params: {facetName: '', facetQuery: ''}
      }
    ])
  );
  t.doesNotThrow(
    bind(client.searchForFacetValues, client, [
      {
        indexName: credentials.indexName,
        params: {facetName: '', facetQuery: ''}
      },
      {
        indexName: credentials.indexName,
        params: {facetName: '', facetQuery: ''}
      }
    ])
  );
});
