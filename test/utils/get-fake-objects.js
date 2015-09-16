'use strict';

module.exports = getFakeObjects;

var Chance = require('chance');
var random = require('lodash/number/random');
var times = require('lodash/utility/times');

var chance = new Chance();

function getFakeObjects(nbHits) {
  if (nbHits === undefined) {
    nbHits = 10;
  }

  return times(nbHits, getOneHit);
}

function getOneHit() {
  return {
    objectID: chance.word({length: 10}),
    description: chance.paragraph({sentences: random(1, 3)}),
    popularity: random(1, 100)
  };
}
