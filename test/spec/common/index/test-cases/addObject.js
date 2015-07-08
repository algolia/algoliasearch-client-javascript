'use strict';

var fauxJax = require('faux-jax');

var testCases = module.exports = [{
  object: 'index',
  methodName: 'addObject',
  testName: 'index.addObject(content, cb)',
  callArguments: [{
    yaw: 'one'
  }],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    body: {
      yaw: 'one'
    },
    URL: {
      pathname: '/1/indexes/%s'
    }
  }
}];

// only cors supports PUT
if (!process.browser || fauxJax.support.xhr.cors) {
  testCases.push({
    object: 'index',
    methodName: 'addObject',
    testName: 'index.addObject(content, objectID, cb)',
    callArguments: [{
      yaw: 'two'
    }, 'dsa dsd/ sa'],
    action: 'write',
    expectedRequest: {
      method: 'PUT',
      body: {
        yaw: 'two'
      },
      URL: {
        pathname: '/1/indexes/%s/' + encodeURIComponent('dsa dsd/ sa')
      }
    }
  });
}
