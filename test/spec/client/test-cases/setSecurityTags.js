var test = require('tape');

test('client.setSecurityTags(string or array-based tags)', function(t) {
  var cases = [
    { args: 'user_42,group_51', expected: 'user_42,group_51' },
    { args: ['user_42', 'group_51'], expected: 'user_42,group_51' },
    { args: ['user_42', ['group_50', 'group_51']], expected: 'user_42,(group_50,group_51)' },
  ];

  t.plan(1 + cases.length);

  var AlgoliaSearch = require('algoliasearch');
  var fauxJax = require('faux-jax');
  var url = require('url');
  var forEach = require('lodash-compat/collection/forEach');
  var getCredentials = require('../../../utils/get-credentials');

  var credentials = getCredentials();

  var client = new AlgoliaSearch(credentials.applicationID, credentials.searchOnlyAPIKey);
  var index = client.initIndex(credentials.indexName);

  fauxJax.install();

  // no extra header set
  index.search('first');
  fauxJax.requests[0].respond(200, {}, '{}');
  t.notOk(
    url.parse(fauxJax.requests[0].requestURL, true).query['X-Algolia-TagFilters'],
    'No `X-Algolia-TagFilters` set on first request'
  );

  forEach(cases, function(testCase, i) {
    client.setSecurityTags(testCase.args);

    // extra header set
    index.search('second ' + i);
    fauxJax.requests[1 + i].respond(200, {}, '{}');
    t.equal(
      url.parse(fauxJax.requests[1 + i].requestURL, true).query['X-Algolia-TagFilters'],
      testCase.expected,
      '`X-Algolia-TagFilters` set on second request'
    );

  });
  fauxJax.restore();
});
