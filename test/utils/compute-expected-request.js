module.exports = computeExpectedRequest;

var getRequestURL = require('./get-request-url');

function computeExpectedRequest(expectedRequest, credentials, pathname) {
  expectedRequest.URL = getRequestURL(credentials, pathname);

  expectedRequest.headers = {
    'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
  };

  // default method
  expectedRequest.method = 'GET';

  return expectedRequest;
}
