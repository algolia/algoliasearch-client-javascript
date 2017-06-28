'use strict';
/* eslint-disable prefer-rest-params, no-param-reassign */

// This is the jQuery Algolia Search module
// It's using $.ajax to do requests with a JSONP fallback
// jQuery promises are returned

const inherits = require('inherits');

const AlgoliaSearch = require('../../AlgoliaSearch');
const errors = require('../../errors');
const inlineHeaders = require('../inline-headers');
const jsonpRequest = require('../jsonp-request');
const places = require('../../places.js');

// expose original algoliasearch fn in window
window.algoliasearch = require('./algoliasearch');

if (process.env.NODE_ENV === 'debug') {
  require('debug').enable('algoliasearch*');
}

function algoliasearch(applicationID, apiKey, opts) {
  const cloneDeep = require('../../clone.js');

  const getDocumentProtocol = require('../get-document-protocol');

  opts = cloneDeep(opts || {});

  if (opts.protocol === undefined) {
    opts.protocol = getDocumentProtocol();
  }

  opts._ua = opts._ua || algoliasearch.ua;

  return new AlgoliaSearchJQuery(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.js');
algoliasearch.ua = `Algolia for jQuery ${algoliasearch.version}`;
algoliasearch.initPlaces = places(algoliasearch);

// we expose into window no matter how we are used, this will allow
// us to easily debug any website running algolia
window.__algolia = {
  debug: require('debug'),
  algoliasearch,
};

const $ = window.jQuery;

$.algolia = {
  Client: algoliasearch,
  ua: algoliasearch.ua,
  version: algoliasearch.version,
};

function AlgoliaSearchJQuery() {
  // call AlgoliaSearch constructor
  AlgoliaSearch.apply(this, arguments);
}

inherits(AlgoliaSearchJQuery, AlgoliaSearch);

AlgoliaSearchJQuery.prototype._request = function request(url, opts) {
  return new $.Deferred(deferred => {
    const body = opts.body;

    url = inlineHeaders(url, opts.headers);

    const requestHeaders = {
      accept: 'application/json',
    };

    if (body) {
      if (opts.method === 'POST') {
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
        requestHeaders['content-type'] = 'application/x-www-form-urlencoded';
      } else {
        requestHeaders['content-type'] = 'application/json';
      }
    }

    $.ajax(url, {
      type: opts.method,
      timeout: opts.timeouts.complete,
      dataType: 'json',
      data: body,
      headers: requestHeaders,
      complete: function onComplete(jqXHR, textStatus /* , error*/) {
        if (textStatus === 'timeout') {
          deferred.reject(new errors.RequestTimeout());
          return;
        }

        if (jqXHR.status === 0) {
          deferred.reject(
            new errors.Network({
              more: jqXHR,
            })
          );
          return;
        }

        deferred.resolve({
          statusCode: jqXHR.status,
          body: jqXHR.responseJSON,
          responseText: jqXHR.responseText,
          headers: jqXHR.getAllResponseHeaders(),
        });
      },
    });
  }).promise();
};

// using IE8 or IE9 we will always end up here
// jQuery does not not fallback to XDomainRequest
AlgoliaSearchJQuery.prototype._request.fallback = function requestFallback(
  url,
  opts
) {
  url = inlineHeaders(url, opts.headers);

  return new $.Deferred(deferred => {
    jsonpRequest(url, opts, (err, content) => {
      if (err) {
        deferred.reject(err);
        return;
      }

      deferred.resolve(content);
    });
  }).promise();
};

AlgoliaSearchJQuery.prototype._promise = {
  reject: function reject(val) {
    return new $.Deferred(deferred => {
      deferred.reject(val);
    }).promise();
  },
  resolve: function resolve(val) {
    return new $.Deferred(deferred => {
      deferred.resolve(val);
    }).promise();
  },
  delay: function delay(ms) {
    return new $.Deferred(deferred => {
      setTimeout(() => {
        deferred.resolve();
      }, ms);
    }).promise();
  },
};
