module.exports = {
  testName: 'client.deleteIndex(name, cb)',
  object: 'client',
  methodName: 'deleteIndex',
  pathname: '/1/indexes/boo%20ooo',
  callArguments: ['boo ooo'],
  expectedRequest: {
    method: 'DELETE',
    headers: {}
  }
};
