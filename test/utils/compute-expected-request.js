module.exports = computeExpectedRequest;

var getRequestURL = require('./get-request-url');

function computeExpectedRequest(expectedRequest, credentials, pathname) {
  expectedRequest.URL = getRequestURL(credentials, pathname);

  expectedRequest.headers = expectedRequest.headers || {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  // default method
  expectedRequest.method = expectedRequest.method || 'GET';

  return expectedRequest;
}
