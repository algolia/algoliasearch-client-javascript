module.exports = wrapMethodCallback;

var findMethodCallback = require('./find-method-callback');

function wrapMethodCallback(callArguments, wrapperMethod) {
  var methodCallback = findMethodCallback(callArguments);

  callArguments[callArguments.indexOf(methodCallback)] = function wrappedCallback() {
    methodCallback.apply(null, arguments);
    wrapperMethod(methodCallback);
  };
}
