'use strict';

const test = require('tape');

test('client.enableRateLimitForward()', t => {
  t.plan(12);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  index.search('woo');
  client.enableRateLimitForward('adminAPIKey', 'endUserIP', 'rateLimitAPIKey');
  index.search('woo2');
  client.disableRateLimitForward();
  index.search('woo3');

  fauxJax.waitFor(3, (err, requests) => {
    fauxJax.restore();

    t.error(err);

    const firstRequest = requests[0];
    const secondRequest = requests[1];
    const thirdRequest = requests[2];

    firstRequest.respond(200, {}, '{}');
    secondRequest.respond(200, {}, '{}');
    thirdRequest.respond(200, {}, '{}');

    // firstRequest
    t.equal(
      firstRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'First request has standard apiKey'
    );
    t.notOk(
      firstRequest.requestHeaders['x-forwarded-for'],
      'First request has no `x-forwarded-for`'
    );
    t.notOk(
      firstRequest.requestHeaders['x-forwarded-api-key'],
      'First request has no `x-forwarded-api-key`'
    );
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
    t.notOk(
      thirdRequest.requestHeaders['x-forwarded-for'],
      'Third request has no `x-forwarded-for`'
    );
    t.notOk(
      thirdRequest.requestHeaders['x-forwarded-api-key'],
      'Third request has no `x-forwarded-api-key`'
    );
    t.equal(
      thirdRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'Third request has standard apiKey'
    );
  });
});
