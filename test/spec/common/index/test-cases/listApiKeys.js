'use strict';

module.exports = [{
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
}, {
  object: 'index',
  methodName: 'listApiKeys',
  callArguments: [],
  action: 'read',
  testName: 'index.listApiKeys(cb)',
  expectedRequest: {
    method: 'GET',
    URL: {
      pathname: '/1/indexes/%s/keys'
    }
  }
}];
