'use strict';

var test = require('tape');

test('expect to cache the requests', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var credentials = fixture.credentials;
  var client = fixture.client;

  client._useCache = true;

  fauxJax.install({gzip: true});

  var count = 0;
  fauxJax.on('request', function(req) {
    count++;
    req.respond(200, {}, '{}');
  });

  function search() {
    return client.search([
      {
        indexName: credentials.indexName,
        query: 'Hello'
      }
    ]);
  }

  Promise.all([
    search(),
    search(),
    search()
  ]).then(function() {
    var cacheLength = Object.keys(client.cache).length;

    t.equal(count, 1);
    t.equal(cacheLength, 1);

    fauxJax.restore();
  });
});

test('expect to always return the original response', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var credentials = fixture.credentials;
  var client = fixture.client;

  client._useCache = true;

  fauxJax.install({gzip: true});

  fauxJax.on('request', function(req) {
    req.respond(200, {}, '{"hits": []}');
  });

  function search() {
    return client.search([
      {
        indexName: credentials.indexName,
        query: 'Hello'
      }
    ]);
  }

  search().then(function(content) {
    t.deepEqual(content, {hits: []});

    content.__shouldNotBePresentOnNextResolution = true;

    return search();
  }).then(function(content) {
    t.deepEqual(content, {hits: []});

    fauxJax.restore();
  });
});
