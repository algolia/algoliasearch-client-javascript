// this file is a `factory of algoliasearch()`
// Given a `request` param, it will provide you an AlgoliaSearch client
// using this particular request
module.exports = createAlgoliasearch;

function createAlgoliasearch(request) {
  function algoliasearch(applicationID, apiKey, opts) {
    var AlgoliaSearch = require('./algoliasearch');

    return new AlgoliaSearch(applicationID, apiKey, opts, request);
  }

  algoliasearch.version = require('../package.json').version;
  algoliasearch.helper = require('./algoliasearch.helper');

  return algoliasearch;
}
