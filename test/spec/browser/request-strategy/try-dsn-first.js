'use strict';

var test = require('tape');

// this test uses the utils/support-server to get JSONP responses
test('Request-strategy: Use DSN host first', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');

  var fixture = createFixture();

  var index = fixture.index;

  fauxJax.install();

  index.search('hello');

  fauxJax.once('request', function(req) {
    t.ok(
      /\-dsn.algolia.net$/.test(parse(req.requestURL).hostname),
      'First request was done using the dsn host'
    );

    req.respond(200, {}, '{}');

    fauxJax.restore();
  });
});
