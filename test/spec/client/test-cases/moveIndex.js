module.exports = {
  testName: 'client.moveIndex(from, to, cb)',
  object: 'client',
  methodName: 'moveIndex',
  callArguments: ['from index', 'to index'],
  expectedRequest: {
    method: 'POST',
    URL: {pathname: '/1/indexes/from%20index/operation'},
    body: {
      operation: 'move',
      destination: 'to index'
    }
  }
};
