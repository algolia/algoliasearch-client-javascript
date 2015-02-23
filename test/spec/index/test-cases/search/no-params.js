module.exports = {
  testName: 'index.search(query, cb)',
  methodName: 'search',
  callArguments: ['yaw query'],
  pathname: '/1/indexes/%s/query',
  expectedRequest: {
    method: 'POST',
    body: {
      params: 'query=yaw%20query'
    }
  }
};
