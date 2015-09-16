'use strict';

module.exports = runTestCase;

var merge = require('lodash/object/merge');
var sinon = require('sinon');
var test = require('tape');

var computeExpectedRequest = require('./compute-expected-request');
var findMethodCallback = require('./find-method-callback');
var getCredentials = require('./get-credentials');
var getFakeHitsResponse = require('./get-fake-hits-response');
var testMethodCall = require('./test-method-call');

function runTestCase(testCase) {
  // Setting `only: true` property to a test case will only run this test case
  var runner = testCase.only ? test.only : test;

  testCase.callArguments = testCase.callArguments || [];

  // If you do not provide your own sinon.spy() callback, we will append one
  // to the `testCase.args` property
  if (!findMethodCallback(testCase.callArguments)) {
    testCase.callArguments.push(sinon.spy());
  }

  runner(testCase.testName, function(t) {
    // we could allow a subTest: function(testCase) {}, not needed for now
    // var addSubTest = testCase.subTest !== undefined ? 1 : 0;

    t.plan(testMethodCall.assertCount/* + addSubTest*/);

    // every test case gets it's own credentials
    var credentials = getCredentials({
      prefix: testCase.method,
      indexName: testCase.indexName,
      applicationID: testCase.applicationID,
      searchOnlyAPIKey: testCase.searchOnlyAPIKey
    });

    testCase.expectedRequest = computeExpectedRequest(
      testCase.expectedRequest,
      credentials
    );

    testCase.fakeResponse = merge(
      getFakeHitsResponse(),
      testCase.fakeResponse || {}
    );

    testMethodCall({
      testCase: testCase,
      methodName: testCase.methodName,
      object: testCase.object,
      applicationID: credentials.applicationID,
      searchOnlyAPIKey: credentials.searchOnlyAPIKey,
      indexName: credentials.indexName,
      assert: t
    });
  });
}
