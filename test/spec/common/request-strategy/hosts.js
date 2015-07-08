'use strict';

var test = require('tape');

test('algoliasearch(appId, apiKey, {hosts: [..]})', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install();

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      hosts: ['as-an-array.com']
    }
  });

  var index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an array');
    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'as-an-array.com',
        'Hostname matches for reads'
      );

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
        'as-an-array.com',
        'Hostname matches for writes'
      );

      fauxJax.restore();
    });
  }
});

test('algoliasearch(appId, apiKey, {hosts: {read: [..], write: [..]}})', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install();

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      hosts: {
        read: ['as-an-object-read.com'],
        write: ['as-an-object-write.com']
      }
    }
  });

  var index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an object');
    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'as-an-object-read.com',
        'Hostname matches for reads'
      );

      req.respond(200, {}, '{}');

      testWriteHost();
    });
  }

  function testWriteHost() {
    index.addObject({
      asAnObject: true
    });

    fauxJax.once('request', function(req) {
      t.equal(
        parse(req.requestURL).hostname,
        'as-an-object-write.com',
        'Hostname matches for writes'
      );

      req.respond(200, {}, '{}');

      fauxJax.restore();
    });
  }
});
