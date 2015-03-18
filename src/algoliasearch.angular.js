var algoliasearch = require('../');

module.exports = global.angular.module('algoliasearch', [])
  .service('algolia', ['$injector', function ($injector) {
    return {
      Client: function(applicationID, apiKey, options) {
        options = options || {};
        options.angular = {
          '$injector': $injector
        };
        return algoliasearch(applicationID, apiKey, options);
      }
    };
  }]);
