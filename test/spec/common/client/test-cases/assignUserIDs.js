'use strict';

var testCases = [];

if (process.browser) {
  if (require('faux-jax').support.xhr.cors) {
    testCases.push({
      testName: 'client.assignUserIDs({userID, cluster}, cb)',
      object: 'client',
      methodName: 'assignUserIDs',
      callArguments: [{userIDs: ['one', 'two'], cluster: 'the big one'}],
      action: 'write',
      expectedRequest: {
        method: 'POST',
        body: {cluster: 'the big one', users: ['one', 'two']},
        URL: {pathname: '/1/clusters/mapping/batch'}
      }
    });
  }
} else {
  testCases.push({
    testName: 'client.assignUserIDs({userID, cluster}, cb)',
    object: 'client',
    methodName: 'assignUserIDs',
    callArguments: [{userIDs: ['one', 'two'], cluster: 'the big one'}],
    action: 'write',
    expectedRequest: {
      method: 'POST',
      body: {cluster: 'the big one', users: ['one', 'two']},
      URL: {pathname: '/1/clusters/mapping/batch'}
    }
  });
}

module.exports = testCases;
