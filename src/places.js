/* eslint-disable no-param-reassign */

module.exports = createPlacesClient;

const buildSearchMethod = require('./buildSearchMethod.js');

function createPlacesClient(algoliasearch) {
  return function places(appID, apiKey, opts) {
    const cloneDeep = require('./clone.js');

    opts = (opts && cloneDeep(opts)) || {};
    opts.hosts = opts.hosts || [
      'places-dsn.algolia.net',
      'places-1.algolianet.com',
      'places-2.algolianet.com',
      'places-3.algolianet.com',
    ];

    // allow initPlaces() no arguments => community rate limited
    if (
      arguments.length === 0 ||
      typeof appID === 'object' ||
      appID === undefined
    ) {
      appID = '';
      apiKey = '';
      opts._allowEmptyCredentials = true;
    }

    const client = algoliasearch(appID, apiKey, opts);
    const index = client.initIndex('places');
    index.search = buildSearchMethod('query', '/1/places/query');
    index.getObject = function(objectID, callback) {
      return this.as._jsonRequest({
        method: 'GET',
        url: `/1/places/${encodeURIComponent(objectID)}`,
        hostType: 'read',
        callback,
      });
    };
    return index;
  };
}
