'use strict';

var test = require('tape');

test('client.initIndex()', function(t) {
  t.plan(1);

  var bind = require('lodash/function/bind');

  var algoliasearch = require('../../../../');
  var getCredentials = require('../../../utils/get-credentials');

  var credentials = getCredentials();

  var client = algoliasearch(credentials.applicationID, credentials.searchOnlyAPIKey);

  t.doesNotThrow(bind(client.initIndex, client, credentials.indexName));
});
