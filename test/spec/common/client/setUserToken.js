'use strict';

var test = require('tape');

test('client.setUserToken(token)', function(t) {
  var async = require('async');

  t.plan(2);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  async.series([
    noUserToken,
    userToken
  ], end);

  function noUserToken(cb) {
    index.search('first');

    fauxJax.once('request', function(req) {
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

    fauxJax.once('request', function(req) {
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
