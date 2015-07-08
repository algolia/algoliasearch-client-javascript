'use strict';

module.exports = {
  object: 'index',
  methodName: 'listUserKeys',
  callArguments: [],
  action: 'read',
  testName: 'index.listUserKeys(cb)',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
};
