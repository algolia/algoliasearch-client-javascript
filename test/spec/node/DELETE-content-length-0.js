'use strict';

var test = require('tape');

test('HTTP DELETE should set content-length to 0 (no chunked encoding)', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  fauxJax.install();

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;

  client.deleteIndex('well');

  fauxJax.once('request', function(req) {
    t.notEqual(req.requestHeaders['transfer-encoding'], 'chunked', 'No transfer-encoding: chunked set');
    t.equal(req.requestHeaders['content-length'], '0', 'content-length forced to 0');
    req.respond(200, {}, '{}');
    fauxJax.restore();
  });
});
