module.exports = {
  object: 'index',
  methodName: 'listUserKeys',
  testName: 'index.listUserKeys(cb)',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
};
