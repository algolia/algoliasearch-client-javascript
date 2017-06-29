'use strict';

const test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch client API spec', t => {
  t.plan(1);

  const filter = require('lodash-compat/collection/filter');
  const functions = require('lodash-compat/object/functions');

  const algoliasearch = require('../../../../');
  const onlyPublicProperties = require('../../../utils/only-public-properties');

  const client = algoliasearch('test', 'properties');

  const actualProperties = filter(
    functions(client),
    onlyPublicProperties
  ).sort();

  let expectedProperties = [
    'addAlgoliaAgent',
    'addQueryInBatch',
    'addApiKey',
    'addUserKey',
    'addUserKeyWithValidity',
    'batch',
    'updateApiKey',
    'updateUserKey',
    'clearCache',
    'copyIndex',
    'deleteIndex',
    'deleteApiKey',
    'deleteUserKey',
    'getLogs',
    'getTimeouts',
    'getApiKey',
    'getUserKeyACL',
    'initIndex',
    'listIndexes',
    'listApiKeys',
    'listUserKeys',
    'moveIndex',
    'search',
    'sendQueriesBatch',
    'setExtraHeader',
    'setRequestTimeout',
    'setSecurityTags',
    'setTimeouts',
    'setUserToken',
    'startQueriesBatch',
  ];

  // Node.js only methods, not added conditionnaly because
  // they are still declared in other environments,
  // but they will throw
  expectedProperties = expectedProperties.concat([
    'destroy',
    'disableRateLimitForward',
    'disableSecuredAPIKey',
    'enableRateLimitForward',
    'useSecuredAPIKey',
    'generateSecuredApiKey',
  ]);

  expectedProperties = expectedProperties.sort();

  t.deepEqual(
    actualProperties,
    expectedProperties,
    'We only implement what is tested'
  );
});
