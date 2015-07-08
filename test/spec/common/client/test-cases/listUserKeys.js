'use strict';

module.exports = {
  testName: 'client.listUserKeys(cb)',
  object: 'client',
  methodName: 'listUserKeys',
  action: 'read',
  expectedRequest: {
    method: 'GET',
    URL: {pathname: '/1/keys'}
  }
};
