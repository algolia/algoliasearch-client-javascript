'use strict';

var fauxJax = require('faux-jax');

if (!process.browser || fauxJax.support.xhr.cors) {
  module.exports = [{
    object: 'index',
    methodName: 'deleteApiKey',
    testName: 'index.deleteUserKey(key, cb)',
    callArguments: ['lk9089lk'],
    action: 'write',
    expectedRequest: {
      method: 'DELETE',
      URL: {
        pathname: '/1/indexes/%s/keys/lk9089lk'
      }
    }
  }, {
    object: 'index',
    methodName: 'deleteApiKey',
    testName: 'index.deleteApiKey(key, cb)',
    callArguments: ['lk9089lk'],
    action: 'write',
    expectedRequest: {
      method: 'DELETE',
      URL: {
        pathname: '/1/indexes/%s/keys/lk9089lk'
      }
    }
  }];
}
