module.exports = algoliasearch;

function algoliasearch(applicationID, apiKey, opts) {
  var AlgoliaSearch = require('./src/algoliasearch');

  return new AlgoliaSearch(applicationID, apiKey, opts);
}
