module.exports = oldGlobals;

function oldGlobals() {
  var message =
    'You are trying to use a new version of the AlgoliaSearch JavaScript client with an old notation.' +
    '\nPlease read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x';

  // cannot dynamically add these properties to window, fails on IE old versions
  /*global AlgoliaSearch:true,AlgoliaSearchHelper:true,AlgoliaExplainResults:true*/
  /*eslint no-unused-vars: [2, {"vars": "local"}]*/
  AlgoliaSearch = function() {
    throw new Error(message);
  };

  AlgoliaSearchHelper = function() {
    throw new Error(message);
  };

  AlgoliaExplainResults = function() {
    throw new Error(message);
  };
}
