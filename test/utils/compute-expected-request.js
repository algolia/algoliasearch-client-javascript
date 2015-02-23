module.exports = computeExpectedRequest;

var assign = require('lodash-compat/object/assign');
var format = require('util').format;

function computeExpectedRequest(expectedRequest, credentials) {
  expectedRequest.URL = assign(
    getRequestURL(credentials),
    expectedRequest.URL || {}
  );

  if (expectedRequest.URL.pathname.indexOf('%s') !== -1) {
    expectedRequest.URL.pathname = format(
      expectedRequest.URL.pathname,
      encodeURIComponent(credentials.indexName)
    );
  }

  expectedRequest.headers = expectedRequest.headers || {
    'Content-type': 'application/x-www-form-urlencoded'
  };

  // default method
  expectedRequest.method = expectedRequest.method || 'GET';

  return expectedRequest;
}

function getRequestURL(credentials) {
  return {
    protocol: 'http:',
    host: credentials.applicationID + '-dsn.algolia.net',
    URL: {pathname: '/not-set'},
    query: {
      'X-Algolia-API-Key': credentials.searchOnlyAPIKey,
      'X-Algolia-Application-Id': credentials.applicationID
    }
  };
}
