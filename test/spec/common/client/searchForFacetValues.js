'use strict';

var test = require('tape');
var Promise = global.Promise || require('es6-promise').Promise;

test('client.searchForFacetValues()', function(t) {
  t.plan(6);

  var bind = require('lodash-compat/function/bind');
  var fauxJax = require('faux-jax');

  fauxJax.install({gzip: true});

  var count = 0;
  fauxJax.on('request', function(req) {
    count++;
    req.respond(200, {}, '{}');
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

  Promise.all([
    client.searchForFacetValues([
      {
        indexName: credentials.indexName,
        params: {facetName: '', facetQuery: ''}
      }
    ]),
    client.searchForFacetValues([
      {
        indexName: credentials.indexName,
        params: {facetName: '', facetQuery: ''}
      },
      {
        indexName: credentials.indexName,
        params: {facetName: '', facetQuery: ''}
      }
    ])
  ]).then(function() {
    t.equal(count, 3);

    fauxJax.restore();
  });
});
