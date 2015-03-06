var fauxJax = require('faux-jax');

if (fauxJax.support.xhr.cors) {
  module.exports = {
    testName: 'client.deleteIndex(name, cb)',
    object: 'client',
    methodName: 'deleteIndex',
    callArguments: ['boo ooo'],
    expectedRequest: {
      method: 'DELETE',
      URL: {pathname: '/1/indexes/boo%20ooo'},
      headers: {}
    }
  };
}
