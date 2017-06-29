'use strict';

const test = require('tape');

test('HTTP DELETE should set content-length to 0 (no chunked encoding)', t => {
  t.plan(2);

  const fauxJax = require('faux-jax');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;

  client.deleteIndex('well');

  fauxJax.once('request', req => {
    t.notEqual(
      req.requestHeaders['transfer-encoding'],
      'chunked',
      'No transfer-encoding: chunked set'
    );
    t.equal(
      req.requestHeaders['content-length'],
      '0',
      'content-length forced to 0'
    );
    req.respond(200, {}, '{}');
    fauxJax.restore();
  });
});
