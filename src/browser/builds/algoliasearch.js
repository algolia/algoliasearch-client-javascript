'use strict';

// This is the standalone browser build entry point
// Browser implementation of the Algolia Search JavaScript client,
// using XMLHttpRequest, XDomainRequest and JSONP as fallback
module.exports = algoliasearch;

var inherits = require('inherits');
var Promise = window.Promise || require('es6-promise').Promise;

var AlgoliaSearch = require('../../AlgoliaSearch');
var errors = require('../../errors');
var inlineHeaders = require('../inline-headers');
var jsonpRequest = require('../jsonp-request');

function algoliasearch(applicationID, apiKey, opts) {
  var cloneDeep = require('lodash/lang/cloneDeep');

  var getDocumentProtocol = require('../get-document-protocol');

  opts = cloneDeep(opts || {});

  if (opts.protocol === undefined) {
    opts.protocol = getDocumentProtocol();
  }

  opts._ua = opts._ua || algoliasearch.ua;

  return new AlgoliaSearchBrowser(applicationID, apiKey, opts);
}

algoliasearch.version = require('../../version.js');
algoliasearch.ua = 'Algolia for vanilla JavaScript ' + algoliasearch.version;

// we expose into window no matter how we are used, this will allow
// us to easily debug any website running algolia
window.__algolia = {
  debug: require('debug'),
  algoliasearch: algoliasearch
};

var support = {
  hasXMLHttpRequest: 'XMLHttpRequest' in window,
  hasXDomainRequest: 'XDomainRequest' in window,
  cors: 'withCredentials' in new XMLHttpRequest(),
  timeout: 'timeout' in new XMLHttpRequest()
};

function AlgoliaSearchBrowser() {
  // call AlgoliaSearch constructor
  AlgoliaSearch.apply(this, arguments);
}

inherits(AlgoliaSearchBrowser, AlgoliaSearch);

AlgoliaSearchBrowser.prototype._request = function request(url, opts) {
  return new Promise(function wrapRequest(resolve, reject) {
    // no cors or XDomainRequest, no request
    if (!support.cors && !support.hasXDomainRequest) {
      // very old browser, not supported
      reject(new errors.Network('CORS not supported'));
      return;
    }

    url = inlineHeaders(url, opts.headers);

    var body = opts.body;
    var req = support.cors ? new XMLHttpRequest() : new XDomainRequest();
    var ontimeout;
    var timedOut;

    // do not rely on default XHR async flag, as some analytics code like hotjar
    // breaks it and set it to false by default
    if (req instanceof XMLHttpRequest) {
      req.open(opts.method, url, true);
    } else {
      req.open(opts.method, url);
    }

    if (support.cors) {
      if (body) {
        if (opts.method === 'POST') {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Simple_requests
          req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        } else {
          req.setRequestHeader('content-type', 'application/json');
        }
      }
      req.setRequestHeader('accept', 'application/json');
    }

    // we set an empty onprogress listener
    // so that XDomainRequest on IE9 is not aborted
    // refs:
    //  - https://github.com/algolia/algoliasearch-client-js/issues/76
    //  - https://social.msdn.microsoft.com/Forums/ie/en-US/30ef3add-767c-4436-b8a9-f1ca19b4812e/ie9-rtm-xdomainrequest-issued-requests-may-abort-if-all-event-handlers-not-specified?forum=iewebdevelopment
    req.onprogress = function noop() {};

    req.onload = load;
    req.onerror = error;

    if (support.timeout) {
      // .timeout supported by both XHR and XDR,
      // we do receive timeout event, tested
      req.timeout = opts.timeout;

      req.ontimeout = timeout;
    } else {
      ontimeout = setTimeout(timeout, opts.timeout);
    }

    req.send(body);

    // event object not received in IE8, at least
    // but we do not use it, still important to note
    function load(/* event */) {
      // When browser does not supports req.timeout, we can
      // have both a load and timeout event, since handled by a dumb setTimeout
      if (timedOut) {
        return;
      }

      if (!support.timeout) {
        clearTimeout(ontimeout);
      }

      var out;

      try {
        out = {
          body: JSON.parse(req.responseText),
          responseText: req.responseText,
          statusCode: req.status,
          // XDomainRequest does not have any response headers
          headers: req.getAllResponseHeaders && req.getAllResponseHeaders() || {}
        };
      } catch (e) {
        out = new errors.UnparsableJSON({
          more: req.responseText
        });
      }

      if (out instanceof errors.UnparsableJSON) {
        reject(out);
      } else {
        resolve(out);
      }
    }

    function error(event) {
      if (timedOut) {
        return;
      }

      if (!support.timeout) {
        clearTimeout(ontimeout);
      }

      // error event is trigerred both with XDR/XHR on:
      //   - DNS error
      //   - unallowed cross domain request
      reject(
        new errors.Network({
          more: event
        })
      );
    }

    function timeout() {
      if (!support.timeout) {
        timedOut = true;
        req.abort();
      }

      reject(new errors.RequestTimeout());
    }
  });
};

AlgoliaSearchBrowser.prototype._request.fallback = function requestFallback(url, opts) {
  url = inlineHeaders(url, opts.headers);

  return new Promise(function wrapJsonpRequest(resolve, reject) {
    jsonpRequest(url, opts, function jsonpRequestDone(err, content) {
      if (err) {
        reject(err);
        return;
      }

      resolve(content);
    });
  });
};

AlgoliaSearchBrowser.prototype._promise = {
  reject: function rejectPromise(val) {
    return Promise.reject(val);
  },
  resolve: function resolvePromise(val) {
    return Promise.resolve(val);
  },
  delay: function delayPromise(ms) {
    return new Promise(function resolveOnTimeout(resolve/* , reject*/) {
      setTimeout(resolve, ms);
    });
  }
};
