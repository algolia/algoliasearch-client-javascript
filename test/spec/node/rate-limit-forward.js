'use strict';

var test = require('tape');

test('client.enableRateLimitForward()', function(t) {
  t.plan(12);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  index.search('woo');
  client.enableRateLimitForward('adminAPIKey', 'endUserIP', 'rateLimitAPIKey');
  index.search('woo2');
  client.disableRateLimitForward();
  index.search('woo3');

  fauxJax.waitFor(3, function(err, requests) {
    fauxJax.restore();

    t.error(err);

    var firstRequest = requests[0];
    var secondRequest = requests[1];
    var thirdRequest = requests[2];

    firstRequest.respond(200, {}, '{}');
    secondRequest.respond(200, {}, '{}');
    thirdRequest.respond(200, {}, '{}');

    // firstRequest
    t.equal(
      firstRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'First request has standard apiKey'
    );
    t.notOk(firstRequest.requestHeaders['x-forwarded-for'], 'First request has no `x-forwarded-for`');
    t.notOk(firstRequest.requestHeaders['x-forwarded-api-key'], 'First request has no `x-forwarded-api-key`');
    t.equal(
      firstRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'First request has standard apiKey'
    );

    // secondRequest
    t.equal(
      secondRequest.requestHeaders['x-algolia-api-key'],
      'adminAPIKey',
      'Second request has modified apiKey'
    );
    t.equal(
      secondRequest.requestHeaders['x-forwarded-for'],
      'endUserIP',
      'Second request has an `x-forwarded-for`'
    );
    t.equal(
      secondRequest.requestHeaders['x-forwarded-api-key'],
      'rateLimitAPIKey',
      'Second request has an `x-forwarded-api-key`'
    );

    // thirdRequest
    t.equal(
      thirdRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'Third request has standard apiKey'
    );
    t.notOk(thirdRequest.requestHeaders['x-forwarded-for'], 'Third request has no `x-forwarded-for`');
    t.notOk(thirdRequest.requestHeaders['x-forwarded-api-key'], 'Third request has no `x-forwarded-api-key`');
    t.equal(
      thirdRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'Third request has standard apiKey'
    );
  });
});
