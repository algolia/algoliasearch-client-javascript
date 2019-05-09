'use strict';

var fauxJax = require('faux-jax');

if (!process.browser || fauxJax.support.xhr.cors) {
  module.exports = [{
    testName: 'client.restoreApiKey(key, cb)',
    object: 'client',
    methodName: 'restoreApiKey',
    callArguments: ['mykey'],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      URL: {pathname: '/1/keys/mykey/restore'}
    }
  }];
}
