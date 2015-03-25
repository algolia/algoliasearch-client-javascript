var test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch client API spec', function(t) {
  t.plan(1);

  var algoliasearch = require('../../../');
  var filter = require('lodash-compat/collection/filter');
  var functions = require('lodash-compat/object/functions');

  var onlyPublicProperties = require('../../utils/only-public-properties');

  var client = algoliasearch('test', 'methods');

  var actualMethods = filter(functions(client), onlyPublicProperties).sort();

  var expectedMethods = [
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
    'startQueriesBatch'].sort();

  t.deepEqual(actualMethods, expectedMethods, 'We only implement what is tested');
});
