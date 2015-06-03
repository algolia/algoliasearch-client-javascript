/* global jQuery */
(function ($) {

  $.algolia = {};
  $.algolia.Client = function(applicationID, apiKey, options) {
    options = options || {};
    options.jQuery = {
      '$': $
    };
    options._ua = 'Algolia for jQuery ' + window.ALGOLIA_VERSION;
    return new AlgoliaSearch(applicationID, apiKey, options);
  };

}(jQuery));
