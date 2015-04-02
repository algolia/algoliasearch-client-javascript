module.exports = {
  object: 'index',
  methodName: 'getSettings',
  testName: 'index.getSettings(cb)',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/settings'
    }
  }
};
