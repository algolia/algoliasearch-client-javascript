module.exports = computeExpectedRequest;

var merge = require('lodash-compat/object/merge');
var format = require('util').format;

var algoliasearch = require('../../');

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

  if (!process.browser) {
    expectedRequest.headers['x-algolia-api-key'] = credentials.searchOnlyAPIKey;
    expectedRequest.headers['x-algolia-application-id'] = credentials.applicationID;
    expectedRequest.headers['x-algolia-agent'] = algoliasearch.ua;
    expectedRequest.headers.accept = 'application/json';
  }

  return expectedRequest;
}

function getRequestURL(credentials) {
  var expectedQueryString;

  if (process.browser) {
    expectedQueryString = {
      'x-algolia-api-key': credentials.searchOnlyAPIKey,
      'x-algolia-application-id': credentials.applicationID,
      'x-algolia-agent': algoliasearch.ua
    };
  } else {
    // serverside will send them in headers
    expectedQueryString = {};
  }

  return {
    protocol: process.browser ? document.location.protocol : 'http:',
    URL: {pathname: '/not-set'},
    query: expectedQueryString
  };
}
