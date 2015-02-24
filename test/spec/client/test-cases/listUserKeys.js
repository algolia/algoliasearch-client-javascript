module.exports = {
  testName: 'client.listUserKeys(cb)',
  object: 'client',
  methodName: 'listUserKeys',
  callArguments: [],
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/keys'}
  }
};
