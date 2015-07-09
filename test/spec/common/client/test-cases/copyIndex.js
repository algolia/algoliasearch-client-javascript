'use strict';

module.exports = {
  testName: 'client.copyIndex(from, to, cb)',
  object: 'client',
  methodName: 'copyIndex',
  callArguments: ['from index', 'to index'],
  action: 'write',
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/from%20index/operation'},
    body: {
      operation: 'copy',
      destination: 'to index'
    }
  }
};
