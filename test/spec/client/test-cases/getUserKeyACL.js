module.exports = {
  testName: 'client.getUserKeyACL(key, cb)',
  object: 'client',
  methodName: 'getUserKeyACL',
  callArguments: ['WOOO!'],
  expectedRequest: {
    method: 'GET',
    headers: {},
    URL: {pathname: '/1/keys/WOOO!'}
  }
};
