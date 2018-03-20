'use strict';

var test = require('tape');

test('algoliasearch(appId, apiKey, {dsn: true})', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    credentials: {
      applicationID: 'normal-app',
      searchOnlyAPIKey: 'xxx'
    },
    clientOptions: {
      dsn: true
    }
  });

  var index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an array');
    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'normal-app-dsn.algolia.net',
        'Hostname matches for reads'
      );
      req.respond(200, {}, '{}');

      testWriteHost();
    });
  }

  function testWriteHost() {
    index.addObject({
      asAnArray: true
    });

    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'normal-app.algolia.net',
        'Hostname matches for writes'
      );
      req.respond(200, {}, '{}');

      fauxJax.restore();
    });
  }
});

test('algoliasearch(appId, apiKey, {dsn: false})', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    credentials: {
      applicationID: 'backend-app',
      searchOnlyAPIKey: 'xxx'
    },
    clientOptions: {
      dsn: false
    }
  });

  var index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an array');
    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'backend-app.algolia.net',
        'Hostname matches for reads'
      );
      req.respond(200, {}, '{}');

      testWriteHost();
    });
  }

  function testWriteHost() {
    index.addObject({
      asAnArray: true
    });

    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'backend-app.algolia.net',
        'Hostname matches for writes'
      );
      req.respond(200, {}, '{}');

      fauxJax.restore();
    });
  }
});

test('algoliasearch(appId, apiKey) (default {dsn: true})', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    credentials: {
      applicationID: 'normal-app',
      searchOnlyAPIKey: 'xxx'
    }
  });

  var index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an array');
    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'normal-app-dsn.algolia.net',
        'Hostname matches for reads'
      );
      req.respond(200, {}, '{}');

      testWriteHost();
    });
  }

  function testWriteHost() {
    index.addObject({
      asAnArray: true
    });

    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'normal-app.algolia.net',
        'Hostname matches for writes'
      );
      req.respond(200, {}, '{}');

      fauxJax.restore();
    });
  }
});
