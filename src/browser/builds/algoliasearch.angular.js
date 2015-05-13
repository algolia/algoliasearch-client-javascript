// This is the AngularJS Algolia Search module
// It's using $http to do requests with a JSONP fallback
// $q promises are returned

var inherits = require('inherits');

var AlgoliaSearch = require('../../AlgoliaSearch');
var inlineHeaders = require('../inline-headers');
var JSONPRequest = require('../JSONP-request');

// expose original algoliasearch fn in window
window.algoliasearch = require('./algoliasearch');

global.angular.module('algoliasearch', [])
  .service('algolia', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {

    function algoliasearch(applicationID, apiKey, opts) {
      var extend = require('extend');

      var getDocumentProtocol = require('../get-document-protocol');

      opts = extend(true, {}, opts) || {};

      if (opts.protocol === undefined) {
        opts.protocol = getDocumentProtocol();
      }

      opts._ua = algoliasearch.ua;

      return new AlgoliaSearchAngular(applicationID, apiKey, opts);
    }

    algoliasearch.version = require('../../version.json');
    algoliasearch.ua = 'Algolia for AngularJS ' + algoliasearch.version;

    function AlgoliaSearchAngular() {
      // call AlgoliaSearch constructor
      AlgoliaSearch.apply(this, arguments);
    }

    inherits(AlgoliaSearchAngular, AlgoliaSearch);

    AlgoliaSearchAngular.prototype._request = function(url, opts) {
      // Support most Angular.js versions by using $q.defer() instead
      // of the new $q() constructor
      var deferred = $q.defer();
      var resolve = deferred.resolve;
      var reject = deferred.reject;

      var timedOut;
      var body = opts.body;

      url = inlineHeaders(url, opts.headers);

      var timeout = $q(function(resolveTimeout) {
        $timeout(function() {
          timedOut = true;
          // will cancel the xhr
          resolveTimeout('test');
          resolve(new Error('Timeout - Could not connect to endpoint ' + url));
        }, opts.timeout);
      });

      $http({
        url: url,
        method: opts.method,
        data: body,
        cache: false,
        timeout: timeout
      }).then(function success(response) {
        resolve({
          statusCode: response.status,
          body: response.data
        });
      }, function error(response) {
        if (timedOut) {
          return;
        }

        // network error
        if (response.status === 0) {
          reject(new Error('Network error'));
          return;
        }

        resolve({
          body: response.data,
          statusCode: response.status
        });
      });

      return deferred.promise;
    };

    AlgoliaSearchAngular.prototype._request.fallback = function(url, opts) {
      url = inlineHeaders(url, opts.headers);

      return $q(function(resolve, reject) {
        JSONPRequest(url, opts, function JSONPRequestDone(err, content) {
          if (err) {
            reject(err);
            return;
          }

          resolve(content);
        });
      });
    };

    AlgoliaSearchAngular.prototype._promise = {
      reject: function(val) {
        return $q.reject(val);
      },
      resolve: function(val) {
        // http://www.bennadel.com/blog/2735-q-when-is-the-missing-q-resolve-method-in-angularjs.htm
        return $q.when(val);
      },
      delay: function(ms) {
        return $q(function(resolve/*, reject*/) {
          $timeout(resolve, ms);
        });
      }
    };

    return {
      Client: function (applicationID, apiKey, options) {
        return algoliasearch(applicationID, apiKey, options);
      },
      ua: algoliasearch.ua,
      version: algoliasearch.version
    };
  }]);
