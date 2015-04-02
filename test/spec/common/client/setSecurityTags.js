var test = require('tape');

test('client.setSecurityTags(string or array-based tags)', function(t) {
  var async = require('async');
  var indexOf = require('lodash-compat/array/indexOf');

  var testCases = [
    { args: 'user_42,group_51', expected: 'user_42,group_51' },
    { args: ['user_42', 'group_51'], expected: 'user_42,group_51' },
    { args: ['user_42', ['group_50', 'group_51']], expected: 'user_42,(group_50,group_51)' }
  ];

  t.plan(1 + testCases.length);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var client = fixture.client;
  var index = fixture.index;

  fauxJax.install();

  // no extra header set
  index.search('first');

  fauxJax.once('request', function(req) {
    req.respond(200, {}, '{}');
    t.notOk(
      parse(req.requestURL, true).query['X-Algolia-TagFilters'],
      'No `X-Algolia-TagFilters` set on first request'
    );

    runTestCases();
  });

  function runTestCases() {
    async.eachSeries(testCases, function(testCase, cb) {
      client.setSecurityTags(testCase.args);

      index.search('second ' + indexOf(testCases, testCase));

      fauxJax.once('request', function(req) {
        req.respond(200, {}, '{}');
        t.equal(
          parse(req.requestURL, true).query['X-Algolia-TagFilters'],
          testCase.expected,
          '`X-Algolia-TagFilters` set on second request (' + testCase.expected + ')'
        );

        cb();
      });

    }, end);
  }

  function end() {
    fauxJax.restore();
  }
});
