var testCases = module.exports = [];

var support = require('faux-jax').support;

testCases.push({
  object: 'index',
  methodName: 'waitTask',
  testName: 'index.waitTask(taskID, cb) success',
  callArguments: [25000],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/task/25000'
    }
  },
  fakeResponse: {
    body: {
      status: 'published'
    }
  }
});

// On browsers with only XDomainRequest, this testCase cannot be done
// It also means, when using waitTask with theses browsers, if
// there's an error (status 400), we will retry instead of stopping the wait loop
if (support.xhr.hasXMLHttpRequest && support.xhr.cors) {
  testCases.push({
    object: 'index',
    methodName: 'waitTask',
    testName: 'index.waitTask(taskID, cb) error',
    callArguments: [26000],
    expectedRequest: {
      method: 'GET',
      URL: {
        pathname: '/1/indexes/%s/task/26000'
      }
    },
    fakeResponse: {
      statusCode: 400,
      body: ''
    }
  });
}
