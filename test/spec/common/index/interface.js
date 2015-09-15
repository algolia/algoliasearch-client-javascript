'use strict';

var test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch index API spec', function(t) {
  t.plan(1);

  var algoliasearch = require('../../../../');
  var filter = require('lodash/collection/filter');
  var functions = require('lodash/object/functions');

  var onlyPublicProperties = require('../../../utils/only-public-properties');

  var client = algoliasearch('test', 'methods');
  var index = client.initIndex('himethods');

  var actualMethods = filter(functions(index), onlyPublicProperties).sort();

  var expectedMethods = [
    'addObject',
    'addObjects',
    'addUserKey',
    'addUserKeyWithValidity',
    'updateUserKey',
    'browse',
    'browseFrom',
    'browseAll',
    'clearCache',
    'clearIndex',
    'deleteByQuery',
    'deleteObject',
    'deleteObjects',
    'deleteUserKey',
    'getObject',
    'getObjects',
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

  t.deepEqual(actualMethods, expectedMethods, 'We only implement what is tested');
});
