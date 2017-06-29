'use strict';

const test = require('tape');

test('client.setSecurityTags(string or array-based tags)', t => {
  const async = require('async');
  const indexOf = require('lodash-compat/array/indexOf');

  const testCases = [
    { args: 'user_42,group_51', expected: 'user_42,group_51' },
    { args: ['user_42', 'group_51'], expected: 'user_42,group_51' },
    {
      args: ['user_42', ['group_50', 'group_51']],
      expected: 'user_42,(group_50,group_51)',
    },
  ];

  t.plan(1 + testCases.length);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  // no extra header set
  index.search('first');

  fauxJax.once('request', req => {
    req.respond(200, {}, '{}');
    if (process.browser) {
      t.notOk(
        parse(req.requestURL, true).query['x-algolia-tagfilters'],
        'No `X-Algolia-TagFilters` set on first request'
      );
    } else {
      t.notOk(
        req.requestHeaders['x-algolia-tagfilters'],
        'No `X-Algolia-TagFilters` set on first request'
      );
    }

    runTestCases();
  });

  function runTestCases() {
    async.eachSeries(
      testCases,
      (testCase, cb) => {
        client.setSecurityTags(testCase.args);

        index.search(`second ${indexOf(testCases, testCase)}`);

        fauxJax.once('request', req => {
          req.respond(200, {}, '{}');
          if (process.browser) {
            t.equal(
              parse(req.requestURL, true).query['x-algolia-tagfilters'],
              testCase.expected,
              `\`X-Algolia-TagFilters\` set on second request (${testCase.expected})`
            );
          } else {
            t.equal(
              req.requestHeaders['x-algolia-tagfilters'],
              testCase.expected,
              `\`X-Algolia-TagFilters\` set on second request (${testCase.expected})`
            );
          }

          cb();
        });
      },
      end
    );
  }

  function end() {
    fauxJax.restore();
  }
});
