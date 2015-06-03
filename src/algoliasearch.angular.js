/* global angular */
angular.module('algoliasearch', [])
  .service('algolia', ['$injector', function ($injector) {
    return {
      Client: function(applicationID, apiKey, options) {
        options = options || {};
        options.angular = {
          '$injector': $injector
        };
        options._ua = 'Algolia for AngularJS ' + window.ALGOLIA_VERSION;
        return new AlgoliaSearch(applicationID, apiKey, options);
      }
    };
  }]);
