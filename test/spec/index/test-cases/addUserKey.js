module.exports = {
  object: 'index',
  methodName: 'addUserKey',
  testName: 'index.addUserKey(acls, cb)',
  callArguments: [['search', 'mom']],
  expectedRequest: {
    method: 'POST',
    body: {
      acl: ['search', 'mom']
    },
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
};
