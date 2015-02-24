module.exports = {
  object: 'index',
  methodName: 'clearIndex',
  testName: 'index.clearIndex(cb)',
  expectedRequest: {
    method: 'POST',
    URL: {
      pathname: '/1/indexes/%s/clear'
    }
  }
};
