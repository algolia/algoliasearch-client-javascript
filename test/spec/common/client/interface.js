'use strict';

var test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch client API spec', function(t) {
  t.plan(1);

  var filter = require('lodash/collection/filter');
  var functions = require('lodash/object/functions');

  var algoliasearch = require('../../../../');
  var onlyPublicProperties = require('../../../utils/only-public-properties');

  var client = algoliasearch('test', 'properties');

  var actualProperties = filter(functions(client), onlyPublicProperties).sort();

  var expectedProperties = [
    'Index',
    'addAlgoliaAgent',
    'addQueryInBatch',
    'addUserKey',
    'addUserKeyWithValidity',
    'batch',
    'updateUserKey',
    'clearCache',
    'copyIndex',
    'deleteIndex',
    'deleteUserKey',
    'getLogs',
    'getUserKeyACL',
    'initIndex',
    'listIndexes',
    'listUserKeys',
    'moveIndex',
    'search',
    'sendQueriesBatch',
    'setExtraHeader',
    'setRequestTimeout',
    'setSecurityTags',
    'setUserToken',
    'startQueriesBatch'];

  // Node.js only methods, not added conditionnaly because
  // they are still declared in other environments,
  // but they will throw
  expectedProperties = expectedProperties.concat([
    'destroy',
    'disableRateLimitForward',
    'disableSecuredAPIKey',
    'enableRateLimitForward',
    'useSecuredAPIKey',
    'generateSecuredApiKey'
  ]);

  expectedProperties = expectedProperties.sort();

  t.deepEqual(actualProperties, expectedProperties, 'We only implement what is tested');
});
