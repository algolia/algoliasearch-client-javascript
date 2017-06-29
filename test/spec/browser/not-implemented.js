'use strict';

const test = require('tape');

test('not implemented methods', t => {
  const bind = require('lodash-compat/function/bind');
  const forEach = require('lodash-compat/collection/forEach');

  const clientMethods = [
    'destroy',
    'disableRateLimitForward',
    'disableSecuredAPIKey',
    'enableRateLimitForward',
    'useSecuredAPIKey',
  ];

  t.plan(clientMethods.length);

  const createFixture = require('../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;

  forEach(clientMethods, methodName => {
    const toTest = bind(client[methodName], client);
    t.throws(
      toTest,
      Error,
      `client.${methodName}() throws in unsupported environment`
    );
  });
});
