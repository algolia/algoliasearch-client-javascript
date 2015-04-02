module.exports = testMethodCall;

var algoliasearch = require('../../');
var fauxJax = require('faux-jax');
var parse = require('url-parse');

var wrapMethodCallback = require('./wrap-method-callback');

function testMethodCall(opts) {
  var assert = opts.assert;
  var testCase = opts.testCase;

  var client = algoliasearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  // we wrap and replace the method callback (index.search('query', cb))
  // so that we have our `checkMethodCallback` called when the callback occured
  // as callback are asynchronous, we cannot use synchronous testing
  wrapMethodCallback(testCase.callArguments, checkMethodCallback);

  // this needs to be done here to be as close as possible to the new XMLHttpRequest() call
  fauxJax.install();

  object[opts.methodName].apply(object, testCase.callArguments);

  fauxJax.once('request', function(req) {
    fauxJax.restore();

    var actualRequest = req;
    var expectedRequest = testCase.expectedRequest;

    actualRequest.respond(
      testCase.fakeResponse.statusCode,
      testCase.fakeResponse.headers,
      JSON.stringify(testCase.fakeResponse.body)
    );

    assert.equal(
      actualRequest.requestMethod,
      expectedRequest.method,
      'Request method matches'
    );

    var actualRequestURL = parse(actualRequest.requestURL, true);
    var expectedRequestURL = expectedRequest.URL;

    assert.equal(
      actualRequestURL.host,
      expectedRequestURL.host.toLowerCase(),
      'URL.host matches'
    );

    assert.equal(
      actualRequestURL.pathname,
      expectedRequestURL.pathname,
      'URL.pathname matches'
    );

    assert.equal(
      actualRequestURL.protocol,
      expectedRequestURL.protocol,
      'URL.protocol matches'
    );

    assert.deepEqual(
      actualRequestURL.query,
      expectedRequestURL.query,
      'URL.query matches'
    );

    assert.deepEqual(
      JSON.parse(actualRequest.requestBody),
      expectedRequest.body || null,
      'Request body matches'
    );

    if (!process.browser) {
      // all these headers are handled by nodejs, sometimes
      // differently between versions, we do not care
      delete actualRequest.requestHeaders.connection;
      delete actualRequest.requestHeaders['transfer-encoding'];
      delete actualRequest.requestHeaders.host;
      delete actualRequest.requestHeaders['content-length'];
    }

    if (!process.browser || fauxJax.support.xhr.cors) {
      assert.deepEqual(
        actualRequest.requestHeaders,
        expectedRequest.headers,
        'Request headers matches'
      );
    } else {
      assert.pass('Cannot check requestHeaders, CORS not supported');
    }
  });

  function checkMethodCallback(methodCallback) {
    assert.ok(
      methodCallback.calledOnce,
      'Callback was called once'
    );

    var error = testCase.fakeResponse.statusCode === 200 ? null : Error;
    var args = methodCallback.getCall(0).args;

    if (error) {
      assert.ok(
        args[0] instanceof Error && args.length === 1,
        'We received an error and only an error'
      );
    } else {
      assert.deepEqual(
        methodCallback.getCall(0).args,
        error ? [error] : [error, testCase.fakeResponse.body],
        'Callback called with callback(err, res)'
      );
    }
  }
}

// we do 3 asserts per test
testMethodCall.assertCount = 9;
