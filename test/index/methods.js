var test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch.prototype.Index.prototype API spec', function(t) {
  t.plan(1);

  var AlgoliaSearch = require('algoliasearch');

  var onlyPublicMethods = require('../utils/only-public-methods');

  var expectedMethods = [
    'addObject',
    'addObjects',
    'addUserKey',
    'addUserKeyWithValidity',
    'browse',
    'clearCache',
    'clearIndex',
    'deleteObject',
    'deleteUserKey',
    'getObject',
    'getSettings',
    'getUserKeyACL',
    'listUserKeys',
    'partialUpdateObject',
    'partialUpdateObjects',
    'saveObject',
    'saveObjects',
    'search',
    'setSettings',
    'ttAdapter',
    'waitTask'
  ].sort();

  var actualMethods = Object
    .keys(AlgoliaSearch.prototype.Index.prototype)
    .filter(onlyPublicMethods(AlgoliaSearch.prototype.Index.prototype))
    .sort();

  t.deepEqual(actualMethods, expectedMethods, 'We only implement what is tested');
});
