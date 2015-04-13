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
    'Index',
    'addQueryInBatch',
    'addUserKey',
    'addUserKeyWithValidity',
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
    'sendQueriesBatch',
    'setExtraHeader',
    'setRequestTimeout',
    'setSecurityTags',
    'setUserToken',
    'startQueriesBatch'];

  // Node.js only methods
  expectedProperties = expectedProperties.concat([
    'destroy',
    'disableRateLimitForward',
    'disableSecuredAPIKey',
    'enableRateLimitForward',
    'useSecuredAPIKey'
  ]);

  expectedProperties = expectedProperties.sort();

  t.deepEqual(actualProperties, expectedProperties, 'We only implement what is tested');
});
