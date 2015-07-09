'use strict';

var fauxJax = require('faux-jax');

if (!process.browser || fauxJax.support.xhr.cors) {
  module.exports = {
    object: 'index',
    methodName: 'deleteObject',
    testName: 'index.deleteObject(objectID, cb)',
    callArguments: ['WELL :)'],
    action: 'write',
    expectedRequest: {
      method: 'DELETE',
      URL: {
        pathname: '/1/indexes/%s/' + encodeURIComponent('WELL :)')
      }
    }
  };
}
