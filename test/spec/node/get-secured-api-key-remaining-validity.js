'use strict';

var test = require('tape');
var createFixture = require('../../utils/create-fixture');
var fixture = createFixture();
var client = fixture.client;

var now = new Date().getTime() / 1000;

test('client.GetSecuredApiKeyRemainingValidity(): expired key', function(t) {
  t.plan(1);

  var apiKey = client.generateSecuredApiKey('foo', {
    validUntil: now - (10 * 60)
  });

  t.true(client.getSecuredApiKeyRemainingValidity(apiKey) < 0);
});

test('client.GetSecuredApiKeyRemainingValidity(): valid key', function(t) {
  t.plan(1);

  var apiKey = client.generateSecuredApiKey('foo', {
    validUntil: now + (10 * 60)
  });

  t.true(client.getSecuredApiKeyRemainingValidity(apiKey) > 0);
});

test('client.GetSecuredApiKeyRemainingValidity(): ValidUntil not found', function(t) {
  t.plan(1);

  var apiKey = client.generateSecuredApiKey('foo');

  t.throws(function() {
    client.getSecuredApiKeyRemainingValidity(apiKey);
  }, 'ValidUntil not found.');
});
