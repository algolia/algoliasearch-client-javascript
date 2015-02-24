module.exports = getHitsResponse;

var Chance = require('chance');
var random = require('lodash-compat/number/random');
var times = require('lodash-compat/utility/times');

var chance = new Chance();

function getHitsResponse() {
  var nbHits = random(1, 10);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: {
      hits: times(nbHits, getOneHit),
      nbHits: nbHits,
      page: 0,
      hitsPerPage: 20,
      processingTimeMS: 1
    }
  };
}

function getOneHit() {
  return {
    objectID: chance.word({length: 10}),
    description: chance.paragraph({sentences: random(1, 3)}),
    popularity: random(1, 100)
  };
}
