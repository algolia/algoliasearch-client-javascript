module.exports = {
  object: 'index',
  methodName: 'getUserKeyACL',
  testName: 'index.getUserKeyACL(key, cb)',
  callArguments: ['lk9089lk'],
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/keys/lk9089lk'
    }
  }
};
