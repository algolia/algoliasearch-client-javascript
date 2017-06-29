'use strict';

const test = require('tape');

// this test uses the utils/support-server to get JSONP responses
test('Request-strategy: Use DSN host first', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');

  const createFixture = require('../../../utils/create-fixture');

  const fixture = createFixture();

  const index = fixture.index;

  fauxJax.install();

  index.search('hello');

  fauxJax.once('request', req => {
    t.ok(
      /\-dsn.algolia.net$/.test(parse(req.requestURL).hostname),
      'First request was done using the dsn host'
    );

    req.respond(200, {}, '{}');

    fauxJax.restore();
  });
});
