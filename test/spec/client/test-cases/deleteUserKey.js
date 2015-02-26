var fauxJax = require('faux-jax');

if (fauxJax.support.cors) {
  module.exports = {
    testName: 'client.deleteUserKey(key, cb)',
    object: 'client',
    methodName: 'deleteUserKey',
    callArguments: [ 'mykey' ],
    expectedRequest: {
      method: 'DELETE',
      URL: {pathname: '/1/keys/mykey'}
    }
  };
}
