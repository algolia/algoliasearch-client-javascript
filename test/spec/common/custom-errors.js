'use strict';

var test = require('tape');

var errors = require('../../../src/errors');

test('We get custom errors with stacks', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  fauxJax.once('request', function(req) {
    req.respond(400, {}, '{"message": "GOAWAY!", "status": 400}');
    fauxJax.restore();
  });

  index.search('something', function(err) {
    t.ok(err instanceof Error, 'Its an instance of Error');
    t.ok(err instanceof errors.AlgoliaSearchError, 'Its an instance of AlgoliaSearchError');
    t.ok(err.stack, 'We have a stacktrace');
  });
});
