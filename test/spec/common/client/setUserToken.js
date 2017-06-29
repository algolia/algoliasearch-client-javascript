'use strict';

const test = require('tape');

test('client.setUserToken(token)', t => {
  const async = require('async');

  t.plan(2);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  async.series([noUserToken, userToken], end);

  function noUserToken(cb) {
    index.search('first');

    fauxJax.once('request', req => {
      req.respond(200, {}, '{}');
      if (process.browser) {
        t.notOk(
          parse(req.requestURL, true).query['x-algolia-usertoken'],
          'No `X-Algolia-UserToken` set on first request'
        );
      } else {
        t.notOk(
          req.requestHeaders['x-algolia-usertoken'],
          'No `X-Algolia-UserToken` set on first request'
        );
      }

      cb();
    });
  }

  function userToken(cb) {
    client.setUserToken('foo/bar');

    index.search('second');

    fauxJax.once('request', req => {
      req.respond(200, {}, '{}');

      if (process.browser) {
        t.equal(
          parse(req.requestURL, true).query['x-algolia-usertoken'],
          'foo/bar',
          '`X-Algolia-UserToken` set on second request'
        );
      } else {
        t.equal(
          req.requestHeaders['x-algolia-usertoken'],
          'foo/bar',
          '`X-Algolia-UserToken` set on second request'
        );
      }

      cb();
    });
  }

  function end() {
    fauxJax.restore();
  }
});
