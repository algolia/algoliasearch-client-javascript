'use strict';

module.exports = onlyPublicProperties;

function onlyPublicProperties(propName) {
  return !/^_/.test(propName);
}
