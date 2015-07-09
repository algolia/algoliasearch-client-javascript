'use strict';

var test = require('tape');

test('window.__algolia', function(t) {
  t.plan(4);

  var algoliasearch = require('../../../');

  t.ok(window.__algolia, 'we exported it');
  t.equal(window.__algolia.algoliasearch.version, algoliasearch.version, 'version matches');
  t.equal(window.__algolia.algoliasearch.ua, algoliasearch.ua, 'ua matches');
  t.ok(window.__algolia.debug, 'debug is present');
});
