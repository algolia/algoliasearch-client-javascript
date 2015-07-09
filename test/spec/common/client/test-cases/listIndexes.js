'use strict';

var sinon = require('sinon');

module.exports = [{
  testName: 'client.listIndexes(cb)',
  object: 'client',
  methodName: 'listIndexes',
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes'
    }
  }
}, {
  testName: 'client.listIndexes(cb, page)',
  object: 'client',
  methodName: 'listIndexes',
  action: 'read',
  callArguments: [10, sinon.spy()],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes',
      query: {
        page: '10'
      }
    }
  }
}];
