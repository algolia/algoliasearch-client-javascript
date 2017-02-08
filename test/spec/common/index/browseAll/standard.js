'use strict';

var test = require('tape');

test('index.browseAll(query, queryParameters)', function(t) {
  t.plan(6);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var bind = require('lodash-compat/function/bind');
  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install({gzip: true});

  var browser = index.browseAll('some', {
    hitsPerPage: 200
  });

  browser.once('result', firstResult);
  fauxJax.once('request', firstBrowse);
  browser.once('end', end);
  browser.once('error', bind(t.fail, t));

  function firstBrowse(req) {
    var parsedURL = parse(req.requestURL, true);

    t.equal(
      parsedURL.pathname,
      '/1/indexes/' + encodeURIComponent(fixture.credentials.indexName) + '/browse',
      'pathname matches'
    );
    t.deepEqual(
      JSON.parse(req.requestBody),
      {params: 'hitsPerPage=200&query=some'},
      'params matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
        cursor: 'fslajf21rf31fé==!'
      })
    );

    fauxJax.once('request', secondBrowse);
  }

  function secondBrowse(req) {
    t.deepEqual(
      JSON.parse(req.requestBody),
      {cursor: 'fslajf21rf31fé==!'},
      'cursor matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 300
      })
    );

    fauxJax.restore();
  }

  function firstResult(content) {
    t.equal(content.nbHits, 100, 'first result matches');
    browser.once('result', secondResult);
  }

  function secondResult(content) {
    t.equal(content.nbHits, 300, 'second result matches');
  }

  function end() {
    t.pass('we got an end event');
  }
});
