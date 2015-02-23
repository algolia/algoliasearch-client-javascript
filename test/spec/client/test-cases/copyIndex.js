module.exports = {
  testName: 'client.copyIndex(from, to, cb)',
  object: 'client',
  methodName: 'copyIndex',
  pathname: '/1/indexes/from%20index/operation',
  callArguments: ['from index', 'to index'],
  expectedRequest: {
    method: 'POST',
    body: {
      operation: 'copy',
      destination: 'to index'
    }
  }
};
