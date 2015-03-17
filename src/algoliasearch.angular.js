var createAlgoliasearch = require('./create-algoliasearch');
var JSONPRequest = require('./jsonp-request');

global.angular.module('algoliasearch', [])
  .service('algolia', ['$http', '$q', function ($http, $q) {
    function request(url, opts) {
      return $q(function(resolve, reject) {
        var body = null;

        if (opts.body !== undefined) {
          body = JSON.stringify(opts.body);
        }

        $http({
          url: url,
          method: opts.method,
          data: body,
          cache: false,
          timeout: opts.timeout
        }).then(function success(response) {
          resolve({
            statusCode: response.status,
            body: response.data
          });
        }, function error(response) {
          // network error or timeout
          if (response.status === 0) {
            reject(new Error('Network error or timeout'));
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

    var algoliasearch = createAlgoliasearch(request);
    return {
      Client: function(applicationID, apiKey, options) {
        return algoliasearch(applicationID, apiKey, options);
      }
    };
  }]);
