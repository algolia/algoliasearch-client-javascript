'use strict';

module.exports = getFakeHitsResponse;

const random = require('lodash-compat/number/random');

const getFakeObjects = require('./get-fake-objects');

function getFakeHitsResponse() {
  const nbHits = random(1, 10);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: {
      hits: getFakeObjects(nbHits),
      nbHits,
      page: 0,
      hitsPerPage: 20,
      processingTimeMS: 1,
    },
  };
}
