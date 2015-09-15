'use strict';

module.exports = wrapMethodCallback;

var findMethodCallback = require('./find-method-callback');

function wrapMethodCallback(callArguments, wrapperMethod) {
  var methodCallback = findMethodCallback(callArguments);
  var indexOf = require('lodash/array/indexOf');

  callArguments[indexOf(callArguments, methodCallback)] = function wrappedCallback() {
    methodCallback.apply(null, arguments);
    wrapperMethod(methodCallback);
  };
}
