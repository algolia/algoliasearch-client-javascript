'use strict';

var test = require('tape');

test('client.useSecuredAPIKey()', function(t) {
  t.plan(12);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  index.search('woo');
  client.useSecuredAPIKey('securedAPIKey', 'securityTags', 'userToken');
  index.search('woo2');
  client.disableSecuredAPIKey();
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
    t.notOk(firstRequest.requestHeaders['x-algolia-tagfilters'], 'First request has no `x-algolia-tagfilters`');
    t.notOk(firstRequest.requestHeaders['x-algolia-usertoken'], 'First request has no `x-algolia-usertoken`');
    t.equal(
      firstRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'First request has standard apiKey'
    );

    // secondRequest
    t.equal(
      secondRequest.requestHeaders['x-algolia-api-key'],
      'securedAPIKey',
      'Second request has modified apiKey'
    );
    t.equal(
      secondRequest.requestHeaders['x-algolia-tagfilters'],
      'securityTags',
      'Second request has an `x-algolia-tagfilters`'
    );
    t.equal(
      secondRequest.requestHeaders['x-algolia-usertoken'],
      'userToken',
      'Second request has an `x-algolia-usertoken`'
    );

    // thirdRequest
    t.equal(
      thirdRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'Third request has standard apiKey'
    );
    t.notOk(thirdRequest.requestHeaders['x-algolia-tagfilters'], 'Third request has no `x-algolia-tagfilters`');
    t.notOk(thirdRequest.requestHeaders['x-algolia-usertoken'], 'Third request has no `x-algolia-usertoken`');
    t.equal(
      thirdRequest.requestHeaders['x-algolia-api-key'],
      fixture.credentials.searchOnlyAPIKey,
      'Third request has standard apiKey'
    );
  });
});
