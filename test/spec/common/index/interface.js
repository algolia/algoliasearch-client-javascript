'use strict';

const test = require('tape');

// this test will ensure we are implementing a particular API method
// If you had a new method, it will first fail, you will have to write a test
// for it
test('AlgoliaSearch index API spec', t => {
  t.plan(1);

  const algoliasearch = require('../../../../');
  const filter = require('lodash-compat/collection/filter');
  const functions = require('lodash-compat/object/functions');

  const onlyPublicProperties = require('../../../utils/only-public-properties');

  const client = algoliasearch('test', 'methods');
  const index = client.initIndex('himethods');

  const actualMethods = filter(functions(index), onlyPublicProperties).sort();

  const expectedMethods = [
    'addObject',
    'addObjects',
    'addApiKey',
    'addUserKey',
    'addUserKeyWithValidity',
    'batchSynonyms',
    'batchRules',
    'browse',
    'browseAll',
    'browseFrom',
    'clearCache',
    'clearIndex',
    'clearSynonyms',
    'clearRules',
    'deleteByQuery',
    'deleteObject',
    'deleteObjects',
    'deleteSynonym',
    'deleteRule',
    'deleteApiKey',
    'deleteUserKey',
    'getObject',
    'getObjects',
    'getSettings',
    'getSynonym',
    'getRule',
    'getApiKey',
    'getUserKeyACL',
    'listApiKeys',
    'listUserKeys',
    'partialUpdateObject',
    'partialUpdateObjects',
    'saveObject',
    'saveObjects',
    'saveSynonym',
    'saveRule',
    'search',
    'searchForFacetValues',
    'searchFacet',
    'searchSynonyms',
    'searchRules',
    'setSettings',
    'similarSearch',
    'ttAdapter',
    'updateApiKey',
    'updateUserKey',
    'waitTask',
  ].sort();

  t.deepEqual(
    actualMethods,
    expectedMethods,
    'We only implement what is tested'
  );
});
