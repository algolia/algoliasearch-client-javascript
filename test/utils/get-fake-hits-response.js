'use strict';

module.exports = getFakeHitsResponse;

var random = require('lodash/number/random');

var getFakeObjects = require('./get-fake-objects');

function getFakeHitsResponse() {
  var nbHits = random(1, 10);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: {
      hits: getFakeObjects(nbHits),
      nbHits: nbHits,
      page: 0,
      hitsPerPage: 20,
      processingTimeMS: 1
    }
  };
}
