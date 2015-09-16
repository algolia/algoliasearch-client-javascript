'use strict';

module.exports = findMethodCallback;

function findMethodCallback(args) {
  var findLast = require('lodash/collection/findLast');
  var isFunction = require('lodash/lang/isFunction');

  // if there's a function when reading arguments from right to left
  // then it's the callback of our call
  return findLast(args, isFunction);
}
