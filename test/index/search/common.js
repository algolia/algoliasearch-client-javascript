var bulkRequire = require('bulk-require');
var forEach = require('lodash-compat/collection/forEach');
var format = require('util').format;
var test = require('tape');

var computeExpectedRequest = require('../../utils/compute-expected-request');
var getCredentials = require('../../utils/get-credentials');
var getTestCases = require('../../utils/get-test-cases');
var getFakeHitsResponse = require('../../utils/get-fake-hits-response');
var testXHRCall = require('../../utils/test-xhr-call');

// all frontend bulkRequire calls must be done inlined, you cannot:
// `function dynamicBulk(base, glob) {return bulkRequire(base, glob)}`
var testCases = getTestCases(bulkRequire(__dirname, 'common/*.js'));

forEach(testCases, run);

function run(testCase) {
  if (testCase.only) {
    test = test.only;
  }

  test('index.search() - ' + testCase.testName, function(t) {
    t.plan(testXHRCall.assertCount);

    var credentials = getCredentials('search');

    testCase.expectedRequest = computeExpectedRequest(
      testCase.expectedRequest,
      credentials,
      format('/1/indexes/%s/query', encodeURIComponent(credentials.indexName))
    );
    testCase.fakeResponse = getFakeHitsResponse();

    testXHRCall({
      testCase: testCase,
      methodName: 'search',
      object: 'index',
      applicationID: credentials.applicationID,
      searchOnlyAPIKey: credentials.searchOnlyAPIKey,
      indexName: credentials.indexName,
      assert: t
    });

    t.end();
  });
}
