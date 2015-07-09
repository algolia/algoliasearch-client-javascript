'use strict';

var fauxJax = require('faux-jax');

if (!process.browser || fauxJax.support.xhr.cors) {
  module.exports = {
    testName: 'client.deleteIndex(name, cb)',
    object: 'client',
    methodName: 'deleteIndex',
    callArguments: ['boo ooo'],
    action: 'write',
    expectedRequest: {
      method: 'DELETE',
      URL: {pathname: '/1/indexes/boo%20ooo'}
    }
  };
}
