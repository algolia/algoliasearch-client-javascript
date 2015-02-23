module.exports = {
  testName: 'client.moveIndex(from, to, cb)',
  object: 'client',
  methodName: 'moveIndex',
  pathname: '/1/indexes/from%20index/operation',
  callArguments: ['from index', 'to index'],
  expectedRequest: {
    method: 'POST',
    body: {
      operation: 'move',
      destination: 'to index'
    }
  }
};
