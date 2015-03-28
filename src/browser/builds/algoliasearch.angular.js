var createAlgoliasearch = require('../../create-algoliasearch');
var JSONPRequest = require('../jsonp-request');

global.angular.module('algoliasearch', [])
  .service('algolia', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
    function request(url, opts) {
      return $q(function(resolve, reject) {
        var timedOut;
        var body = null;

        if (opts.body !== undefined) {
          body = JSON.stringify(opts.body);
        }

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
      });
    }

    request.fallback = function(url, opts) {
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

    request.reject = function(val) {
      return $q.reject(val);
    };

    request.resolve = function(val) {
      // http://www.bennadel.com/blog/2735-q-when-is-the-missing-q-resolve-method-in-angularjs.htm
      return $q.when(val);
    };

    request.delay = function(ms) {
      return $q(function(resolve/*, reject*/) {
        $timeout(resolve, ms);
      });
    };

    var algoliasearch = createAlgoliasearch(request);
    return {
      Client: function(applicationID, apiKey, options) {
        return algoliasearch(applicationID, apiKey, options);
      }
    };
  }]);
