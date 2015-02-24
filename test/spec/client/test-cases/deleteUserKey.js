module.exports = {
  testName: 'client.deleteUserKey(key, cb)',
  object: 'client',
  methodName: 'deleteUserKey',
  callArguments: [ 'mykey' ],
  expectedRequest: {
    method: 'DELETE',
    headers: {},
    URL: {pathname: '/1/keys/mykey'}
  }
};
