/* global angular */
angular.module('algoliasearch', [])
  .service('algolia', ['$injector', function ($injector) {
    return {
      Client: function(applicationID, apiKey, options) {
        options = options || {};
        options.angular = {
          '$injector': $injector
        };
        return new AlgoliaSearch(applicationID, apiKey, options);
      }
    };
  }]);
