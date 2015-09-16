'use strict';

module.exports = computeExpectedRequest;

var merge = require('lodash/object/merge');
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

  expectedRequest.headers.accept = 'application/json';

  if (expectedRequest.body !== null) {
    // CORS simple request
    if (process.browser && expectedRequest.method === 'POST') {
      expectedRequest.headers['content-type'] = 'application/x-www-form-urlencoded';
    } else {
      expectedRequest.headers['content-type'] = 'application/json';
    }
  }

  if (!process.browser) {
    expectedRequest.headers['x-algolia-api-key'] = credentials.searchOnlyAPIKey;
    expectedRequest.headers['x-algolia-application-id'] = credentials.applicationID;
    expectedRequest.headers['x-algolia-agent'] = algoliasearch.ua;
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
    protocol: process.browser ?
      // browser defaults to document protocol
      document.location.protocol :
      // nodejs defaults to https
      'https:',
    URL: {pathname: '/not-set'},
    query: expectedQueryString
  };
}
