'use strict';

module.exports = testMethodCall;

const algoliasearch = require('../../');
const fauxJax = require('faux-jax');
const parse = require('url-parse');

const wrapMethodCallback = require('./wrap-method-callback');

function testMethodCall(opts) {
  const assert = opts.assert;
  const testCase = opts.testCase;

  const client = algoliasearch(opts.applicationID, opts.searchOnlyAPIKey);
  let object;
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
  fauxJax.install({ gzip: true });

  object[opts.methodName](...testCase.callArguments);

  fauxJax.once('request', actualRequest => {
    fauxJax.restore();

    const expectedRequest = testCase.expectedRequest;

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

    const actualRequestURL = parse(actualRequest.requestURL, true);
    const expectedRequestURL = expectedRequest.URL;

    if (testCase.action === undefined) {
      assert.fail('No action (read/write) given in the test case');
    } else if (testCase.action === 'read') {
      assert.equal(
        actualRequestURL.host,
        `${opts.applicationID.toLowerCase()}-dsn.algolia.net`,
        'We used the first read host (DSN)'
      );
    } else if (testCase.action === 'write') {
      assert.equal(
        actualRequestURL.host,
        `${opts.applicationID.toLowerCase()}.algolia.net`,
        'We used the first write host (fault tolerant)'
      );
    } else {
      assert.fail(
        `Unkown action (read/write) found in the test case (was: ${testCase.action})`
      );
    }

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

    if (actualRequest.requestBody) {
      assert.deepEqual(
        JSON.parse(actualRequest.requestBody),
        expectedRequest.body,
        'Request body matches'
      );
    } else {
      assert.pass('No body set');
    }

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
    assert.ok(methodCallback.calledOnce, 'Callback was called once');

    const error = testCase.fakeResponse.statusCode === 200 ? null : Error;
    const args = methodCallback.getCall(0).args;

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
