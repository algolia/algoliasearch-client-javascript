/* eslint-disable prefer-rest-params, no-param-reassign */
const foreach = require('foreach');

module.exports = function merge(destination /* , sources */) {
  const sources = Array.prototype.slice.call(arguments);

  foreach(sources, source => {
    for (const keyName in source) {
      if (source.hasOwnProperty(keyName)) {
        if (
          typeof destination[keyName] === 'object' &&
          typeof source[keyName] === 'object'
        ) {
          destination[keyName] = merge(
            {},
            destination[keyName],
            source[keyName]
          );
        } else if (source[keyName] !== undefined) {
          destination[keyName] = source[keyName];
        }
      }
    }
  });

  return destination;
};
