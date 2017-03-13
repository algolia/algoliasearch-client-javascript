'use strict';

module.exports = [{
  testName: 'client.listUserKeys(cb)',
  object: 'client',
  methodName: 'listUserKeys',
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/keys'}
  }
}, {
  testName: 'client.listApiKeys(cb)',
  object: 'client',
  methodName: 'listApiKeys',
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/keys'}
  }
}];
