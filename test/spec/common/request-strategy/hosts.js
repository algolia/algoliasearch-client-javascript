'use strict';

const test = require('tape');

test('algoliasearch(appId, apiKey, {hosts: [..]})', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture({
    clientOptions: {
      hosts: ['as-an-array.com'],
    },
  });

  const index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an array');
    fauxJax.once('request', req => {
      t.equal(
        parse(req.requestURL).hostname,
        'as-an-array.com',
        'Hostname matches for reads'
      );
      req.respond(200, {}, '{}');

      testWriteHost();
    });
  }

  function testWriteHost() {
    index.addObject({
      asAnArray: true,
    });

    fauxJax.once('request', req => {
      t.equal(
        parse(req.requestURL).hostname,
        'as-an-array.com',
        'Hostname matches for writes'
      );
      req.respond(200, {}, '{}');

      fauxJax.restore();
    });
  }
});

test('algoliasearch(appId, apiKey, {hosts: {read: [..], write: [..]}})', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture({
    clientOptions: {
      hosts: {
        read: ['as-an-object-read.com'],
        write: ['as-an-object-write.com'],
      },
    },
  });

  const index = fixture.index;

  testReadHost();

  function testReadHost() {
    index.search('as an object');
    fauxJax.once('request', req => {
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
      asAnObject: true,
    });

    fauxJax.once('request', req => {
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
