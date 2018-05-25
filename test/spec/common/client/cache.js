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
    var cacheID = Object.keys(client.cache)[0];

    t.equal(count, 1);
    t.equal(
      cacheID,
      '/1/indexes/*/queries_body_{"requests":[{"indexName":"'
      + credentials.indexName
      + '","params":"query=Hello"}]}'
    );

    fauxJax.restore();
  });
});

// @TODO: enable this test when we are able to mock `responseText`
// test('expect to always return the original response', function(t) {
//   t.plan(2);

//   var fauxJax = require('faux-jax');
//   var createFixture = require('../../../utils/create-fixture');
//   var fixture = createFixture();
//   var credentials = fixture.credentials;
//   var client = fixture.client;

//   client._useCache = true;

//   fauxJax.install({gzip: true});

//   var count = 0;
//   fauxJax.on('request', function(req) {
//     count++;
//     req.respond(200, {}, '{"hits": []}');
//   });

//   function search() {
//     return client.search([
//       {
//         indexName: credentials.indexName,
//         query: 'Hello'
//       }
//     ]);
//   }

//   search().then(function(content) {
//     t.deepEqual(content, {hits: []});

//     content.__shouldNotBePresentOnNextResolution = true;

//     return search();
//   }).then(function(content) {
//     t.deepEqual(content, {hits: []});

//     fauxJax.restore();
//   });
// });
