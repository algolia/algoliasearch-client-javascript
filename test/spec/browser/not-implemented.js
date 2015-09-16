'use strict';

var test = require('tape');

test('not implemented methods', function(t) {
  var bind = require('lodash/function/bind');
  var forEach = require('lodash/collection/forEach');

  var clientMethods = [
    'destroy',
    'disableRateLimitForward',
    'disableSecuredAPIKey',
    'enableRateLimitForward',
    'useSecuredAPIKey'
  ];

  t.plan(clientMethods.length);

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;

  forEach(clientMethods, function(methodName) {
    var toTest = bind(client[methodName], client);
    t.throws(toTest, Error, 'client.' + methodName + '() throws in unsupported environment');
  });
});
