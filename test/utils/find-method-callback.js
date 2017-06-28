'use strict';

module.exports = findMethodCallback;

function findMethodCallback(args) {
  const findLast = require('lodash-compat/collection/findLast');
  const isFunction = require('lodash-compat/lang/isFunction');

  // if there's a function when reading arguments from right to left
  // then it's the callback of our call
  return findLast(args, isFunction);
}
