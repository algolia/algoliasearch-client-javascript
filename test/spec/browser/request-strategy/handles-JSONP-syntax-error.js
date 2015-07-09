'use strict';

var test = require('tape');

test('Request strategy handles JSONP syntax errors', function(t) {
  t.plan(6);
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var xhr = require('xhr');

  var createFixture = require('../../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host
      ],
      timeout: 5000
    },
    indexName: 'JSONP-syntax-error'
  });

  function searchCallback(err) {
    fauxJax.restore();

    t.ok(err instanceof Error);
    t.equal(
      err.message,
      '<script> was loaded but did not call our provided callback',
      'Error message matches'
    );

    checkNbCalls();
  }

  var index = fixture.index;

  xhr({
    uri: '/1/indexes/JSONP-syntax-error/reset',
    json: true
  }, function run(err, res, body) {
    t.error(err, 'No error while calling /1/indexes/JSONP-syntax-error/reset');
    t.deepEqual(body, {calls: 0}, 'No JSONP calls done');

    fauxJax.install();

    index.search('JSONP Failure', searchCallback);

    fauxJax.once('request', function(req) {
      // hacky way to simulate a network error so that we try JSONP right away
      req.onerror();
    });
  });

  function checkNbCalls() {
    xhr({
      uri: '/1/indexes/JSONP-syntax-error/calls',
      json: true
    }, function run(err, res, body) {
      t.error(err, 'No error while calling /1/indexes/JSONP-syntax-error/calls');
      t.deepEqual(body, {calls: 2}, 'Two JSONP calls done, we have two hosts');
    });
  }
});
