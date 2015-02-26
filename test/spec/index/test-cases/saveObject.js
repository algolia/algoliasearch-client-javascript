var fauxJax = require('faux-jax');

if (fauxJax.support.cors) {
  var clone = require('lodash-compat/lang/clone');

  var object = {
    objectID: 'dawg IE!',
    yaw: 'partial'
  };

  module.exports = {
    object: 'index',
    methodName: 'saveObject',
    testName: 'index.saveObject(object, cb)',
    callArguments: [object],
    expectedRequest: {
      method: 'PUT',
      body: clone(object),
      URL: {
        pathname: '/1/indexes/%s/' + encodeURIComponent(object.objectID)
      }
    }
  };
}
