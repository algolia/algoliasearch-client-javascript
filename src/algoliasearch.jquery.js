/* global jQuery */
(function ($) {

  $.algolia = {};
  $.algolia.Client = function(applicationID, apiKey, options) {
    options = options || {};
    options.jQuery = {
      '$': $
    };
    return new AlgoliaSearch(applicationID, apiKey, options);
  };

}(jQuery));
