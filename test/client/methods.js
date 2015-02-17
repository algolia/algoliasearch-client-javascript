var test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch.prototype API spec', function(t) {
  t.plan(1);

  var AlgoliaSearch = require('algoliasearch');

  var onlyPublicMethods = require('../utils/only-public-methods');

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

  var actualMethods = Object
    .keys(AlgoliaSearch.prototype)
    .filter(onlyPublicMethods(AlgoliaSearch.prototype))
    .sort();

  t.deepEqual(actualMethods, expectedMethods, 'We only implement what is tested');
});
