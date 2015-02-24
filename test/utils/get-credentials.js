module.exports = getCredentials;

var Chance = require('chance');
var chance = new Chance();

function getCredentials(opts) {
  var prefix = opts && opts.prefix || chance.word({length: 5});

  return {
    // example: H4PJQW91NZ
    applicationID: chance.word({length: 10}).toUpperCase(),
    // example: 'npm-registry', can contain special characters
    indexName: prefix + chance.string({length: 10}),
    // example: bd1d3e738b97e743e2759613e39183c3
    searchOnlyAPIKey: chance.word({length: 32})
  };
}
