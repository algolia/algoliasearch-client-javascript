'use strict';

var test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch client API spec', function(t) {
  t.plan(1);

  var filter = require('lodash-compat/collection/filter');
  var functions = require('lodash-compat/object/functions');

  var algoliasearch = require('../../../../');
  var onlyPublicProperties = require('../../../utils/only-public-properties');

  var client = algoliasearch('test', 'properties');

  var actualProperties = filter(functions(client), onlyPublicProperties).sort();

  var expectedProperties = [
    'addAlgoliaAgent',
    'addApiKey',
    'addQueryInBatch',
    'addUserKey',
    'addUserKeyWithValidity',
    'assignUserID',
    'batch',
    'clearCache',
    'copyIndex',
    'deleteApiKey',
    'deleteIndex',
    'deleteUserKey',
    'getApiKey',
    'getExtraHeader',
    'getLogs',
    'getTimeouts',
    'getTopUserID',
    'getUserID',
    'getUserKeyACL',
    'initIndex',
    'listApiKeys',
    'listClusters',
    'listIndexes',
    'listUserIDs',
    'listUserKeys',
    'moveIndex',
    'removeUserID',
    'search',
    'searchForFacetValues',
    'searchUserIDs',
    'sendQueriesBatch',
    'setExtraHeader',
    'setRequestTimeout',
    'setSecurityTags',
    'setTimeouts',
    'setUserToken',
    'startQueriesBatch',
    'unsetExtraHeader',
    'updateApiKey',
    'updateUserKey'
  ];

  // Node.js only methods, not added conditionally because
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
