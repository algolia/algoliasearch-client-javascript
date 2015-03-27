/*global AlgoliaExplainResults:true*/
/*eslint no-unused-vars: [2, {"vars": "local"}]*/

module.exports = oldGlobals;

// put old window.AlgoliaSearch.. into window. again so that
// users upgrading to V3 without changing their code, will be warned
function oldGlobals() {
  var message =
    '-- AlgoliaSearch V2 => V3 error --\n' +
    'You are trying to use a new version of the AlgoliaSearch JavaScript client with an old notation.\n' +
    'Please read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x\n' +
    '-- /AlgoliaSearch V2 => V3 error --';

  global.AlgoliaSearch = function() {
    throw new Error(message);
  };

  global.AlgoliaSearchHelper = function() {
    throw new Error(message);
  };

  // cannot use window.AlgoliaExplainResults on old IEs, dunno why
  AlgoliaExplainResults = function() {
    throw new Error(message);
  };
}
