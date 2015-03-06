var fauxJax = require('faux-jax');

if (fauxJax.support.xhr.cors) {
  module.exports = {
    object: 'index',
    methodName: 'deleteUserKey',
    testName: 'index.deleteUserKey(key, cb)',
    callArguments: ['lk9089lk'],
    expectedRequest: {
      method: 'DELETE',
      URL: {
        pathname: '/1/indexes/%s/keys/lk9089lk'
      }
    }
  };
}
