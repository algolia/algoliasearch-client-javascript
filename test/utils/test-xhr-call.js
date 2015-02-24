module.exports = testXHRCall;

var AlgoliaSearch = require('algoliasearch');
var fauxJax = require('faux-jax');
var url = require('url');

var findMethodCallback = require('./find-method-callback');

function testXHRCall(opts) {
  fauxJax.install();

  var assert = opts.assert;
  var testCase = opts.testCase;

  var client = new AlgoliaSearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  var methodCallback = findMethodCallback(testCase.callArguments);

  object[opts.methodName].apply(object, testCase.callArguments);

  var xhr = fauxJax.requests[0];

  xhr.respond(
    testCase.fakeResponse.statusCode,
    testCase.fakeResponse.headers,
    JSON.stringify(testCase.fakeResponse.body)
  );

  assert.equal(
    xhr.requestMethod,
    testCase.expectedRequest.method,
    'Request method matches'
  );

  var actualXHR = url.parse(xhr.requestURL, true);
  var expectedRequest = url.parse(url.format(testCase.expectedRequest.URL), true);

  assert.equal(
    actualXHR.host,
    expectedRequest.host,
    'URL.host matches'
  );

  assert.equal(
    actualXHR.pathname,
    expectedRequest.pathname,
    'URL.pathname matches'
  );

  assert.equal(
    actualXHR.protocol,
    expectedRequest.protocol,
    'URL.protocol matches'
  );

  assert.deepEqual(
    actualXHR.query,
    expectedRequest.query,
    'URL.query matches'
  );

  assert.deepEqual(
    JSON.parse(xhr.requestBody),
    testCase.expectedRequest.body || null,
    'Request body matches'
  );

  assert.deepEqual(
    xhr.requestHeaders,
    testCase.expectedRequest.headers,
    'Request headers matches'
  );

  assert.ok(
    methodCallback.calledOnce,
    'Callback was called once'
  );

  assert.deepEqual(
    methodCallback.getCall(0).args,
    [true, testCase.fakeResponse.body],
    'Callback called with callback(true, fakeResponse.body)'
  );

  fauxJax.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 9;
