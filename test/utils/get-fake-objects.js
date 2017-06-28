'use strict';

module.exports = getFakeObjects;

const Chance = require('chance');
const random = require('lodash-compat/number/random');
const times = require('lodash-compat/utility/times');

const chance = new Chance();

function getFakeObjects(nbHits) {
  if (nbHits === undefined) {
    nbHits = 10;
  }

  return times(nbHits, getOneHit);
}

function getOneHit() {
  return {
    objectID: chance.word({ length: 10 }),
    description: chance.paragraph({ sentences: random(1, 3) }),
    category: `a${chance.word({ lenght: 20 })}`,
    popularity: random(1, 100),
  };
}
