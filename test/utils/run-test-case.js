module.exports = runTestCase;

var format = require('util').format;
var sinon = require('sinon');
var test = require('tape');

var computeExpectedRequest = require('./compute-expected-request');
var findMethodCallback = require('./find-method-callback');
var getCredentials = require('./get-credentials');
var getFakeHitsResponse = require('./get-fake-hits-response');
var testXHRCall = require('./test-xhr-call');

function runTestCase(testCase) {
  // Setting `only: true` property to a test case will only run this test case
  var runner = testCase.only ? test.only : test;

  // If you do not provide your own sinon.spy() callback, we will append one
  // to the `testCase.args` property
  if (!findMethodCallback(testCase.callArguments)) {
    testCase.callArguments.push(sinon.spy());
  }

  runner(testCase.testName, function(t) {
    t.plan(testXHRCall.assertCount);

    // every test case gets it's own credentials
    var credentials = getCredentials({prefix: testCase.method});

    testCase.expectedRequest = computeExpectedRequest(
      testCase.expectedRequest,
      credentials,
      testCase.pathname.indexOf('%s') !== -1 ?
        // do we want to automatically format the `testCase.pathname` or
        // is it already all ready?
        format(testCase.pathname, encodeURIComponent(credentials.indexName)) :
        // no need for replace
        testCase.pathname
    );
    testCase.fakeResponse = testCase.fakeResponse || getFakeHitsResponse();

    testXHRCall({
      testCase: testCase,
      methodName: testCase.methodName,
      object: testCase.object,
      applicationID: credentials.applicationID,
      searchOnlyAPIKey: credentials.searchOnlyAPIKey,
      indexName: credentials.indexName,
      assert: t
    });

    t.end();
  });
}
