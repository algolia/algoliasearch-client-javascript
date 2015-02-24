module.exports = {
  testName: 'client.listUserKeys(cb)',
  object: 'client',
  methodName: 'listUserKeys',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/keys'}
  }
};
