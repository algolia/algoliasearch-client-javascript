module.exports = computeExpectedRequest;

var merge = require('lodash-compat/object/merge');
var format = require('util').format;

function computeExpectedRequest(expectedRequest, credentials) {
  expectedRequest.URL = merge(
    getRequestURL(credentials),
    expectedRequest.URL || {}
  );

  if (expectedRequest.URL.pathname.indexOf('%s') !== -1) {
    expectedRequest.URL.pathname = format(
      expectedRequest.URL.pathname,
      encodeURIComponent(credentials.indexName)
    );
  }

  // default method
  expectedRequest.method = expectedRequest.method || 'GET';

  expectedRequest.headers = expectedRequest.headers || {};

  if (expectedRequest.body === undefined) {
    expectedRequest.body = null;
  }

  if (expectedRequest.body !== null && expectedRequest.method === 'POST' || expectedRequest.method === 'PUT') {
    if (process.browser) {
      expectedRequest.headers['content-type'] = 'application/x-www-form-urlencoded';
    } else {
      expectedRequest.headers['content-type'] = 'application/json';
    }
  }

  return expectedRequest;
}

function getRequestURL(credentials) {
  return {
    protocol: process.browser ? document.location.protocol : 'http:',
    host: credentials.applicationID + '-dsn.algolia.net',
    URL: {pathname: '/not-set'},
    query: {
      'X-Algolia-API-Key': credentials.searchOnlyAPIKey,
      'X-Algolia-Application-Id': credentials.applicationID
    }
  };
}
