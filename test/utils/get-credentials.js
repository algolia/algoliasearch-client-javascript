'use strict';

module.exports = getCredentials;

const Chance = require('chance');
const chance = new Chance();

function getCredentials(opts) {
  opts = opts || {};

  const prefix = (opts && opts.prefix) || chance.word({ length: 5 });

  return {
    // example: H4PJQW91NZ
    applicationID:
      opts.applicationID || chance.word({ length: 10 }).toUpperCase(),
    // example: 'npm-registry', can contain special characters
    indexName: opts.indexName || prefix + chance.string({ length: 10 }),
    // example: bd1d3e738b97e743e2759613e39183c3
    searchOnlyAPIKey: opts.searchOnlyAPIKey || chance.word({ length: 32 }),
  };
}
