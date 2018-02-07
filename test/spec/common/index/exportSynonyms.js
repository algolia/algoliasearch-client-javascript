'use strict';

var test = require('tape');
var bind = require('lodash-compat/function/bind');
var createFixture = require('../../../utils/create-fixture');
var fauxJax = require('faux-jax');
var parse = require('url-parse');
var arrayFrom = require('array.from');

test('exportSynonyms()', function(t) {
  t.plan(6);
  var fixture = createFixture();
  var index = fixture.index;
  fauxJax.install({gzip: true});
  fauxJax.once('request', firstBrowse);

  index
    .exportSynonyms()
    .then(function(data) {
      t.ok(data, 'got some synonyms back');
      t.equal(data.length, 200, 'got the right amount of synonyms back');
      t.notOk(data[0]._highlightResult, 'removed highlighting');
    })
    .catch(bind(t.fail, t));

  function firstBrowse(req) {
    var parsedURL = parse(req.requestURL, true);

    t.equal(
      parsedURL.pathname,
      '/1/indexes/' +
        encodeURIComponent(fixture.credentials.indexName) +
        '/synonyms/search',
      'pathname matches'
    );
    t.deepEqual(
      JSON.parse(req.requestBody),
      {page: 0, hitsPerPage: 100},
      'params match'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 200,
        hits: arrayFrom({length: 100}, function(v, num) {
          return {
            objectID: 'some-qr-rule-' + num,
            condition: {pattern: 'hellomyfriendhowareyou??? ' + num, anchoring: 'is'},
            consequence: {params: {query: 'query-rule-integration-test'}},
            _highlightResult: {}
          };
        })
      })
    );

    fauxJax.once('request', secondBrowse);
  }

  function secondBrowse(req) {
    t.deepEqual(
      JSON.parse(req.requestBody),
      {page: 1, hitsPerPage: 100},
      'cursor matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 200,
        hits: arrayFrom({length: 100}, function(v, num) {
          num += 100;
          return {
            objectID: 'some-qr-rule-' + num,
            condition: {pattern: 'hellomyfriendhowareyou??? ' + num, anchoring: 'is'},
            consequence: {params: {query: 'query-rule-integration-test'}},
            _highlightResult: {}
          };
        })
      })
    );

    fauxJax.restore();
  }
});

test('exportSynonyms(hitsPerPage)', function(t) {
  t.plan(6);
  var fixture = createFixture();
  var index = fixture.index;
  fauxJax.install({gzip: true});
  fauxJax.once('request', firstBrowse);

  index
    .exportSynonyms(50)
    .then(function(data) {
      t.ok(data, 'got some synonyms back');
      t.equal(data.length, 100, 'got the right amount of synonyms back');
      t.notOk(data[0]._highlightResult, 'removed highlighting');
    })
    .catch(bind(t.fail, t));

  function firstBrowse(req) {
    var parsedURL = parse(req.requestURL, true);

    t.equal(
      parsedURL.pathname,
      '/1/indexes/' +
        encodeURIComponent(fixture.credentials.indexName) +
        '/synonyms/search',
      'pathname matches'
    );
    t.deepEqual(
      JSON.parse(req.requestBody),
      {page: 0, hitsPerPage: 50},
      'params match'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
        hits: arrayFrom({length: 50}, function(v, num) {
          return {
            objectID: 'some-synonym-' + num,
            type: 'placeholder',
            placeholder: '<gotcha' + num + '>',
            replacements: ['replacement number ' + num]
          };
        })
      })
    );

    fauxJax.once('request', secondBrowse);
  }

  function secondBrowse(req) {
    t.deepEqual(
      JSON.parse(req.requestBody),
      {page: 1, hitsPerPage: 50},
      'cursor matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
        hits: arrayFrom({length: 50}, function(v, num) {
          num += 50;
          return {
            objectID: 'some-synonym-' + num,
            type: 'placeholder',
            placeholder: '<gotcha' + num + '>',
            replacements: ['replacement number ' + num],
            _highlightResult: {}
          };
        })
      })
    );

    fauxJax.restore();
  }
});
