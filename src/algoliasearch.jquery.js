var algoliasearch = require('../');

global.jQuery.algolia = {};
global.jQuery.algolia.Client = function(applicationID, apiKey, options) {
  options = options || {};
  options.jQuery = {
    '$': global.jQuery
  };
  return algoliasearch(applicationID, apiKey, options);
};
